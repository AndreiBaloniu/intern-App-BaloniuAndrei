import { useEffect, useState } from 'react';

import { currentEnvironment } from '@constants';

import styles from './users.module.scss';

type Gender = 'female' | 'male' | '';

type User = {
  gender: Gender;
  login: {
    uuid: string;
  };
  name: {
    first: string;
    last: string;
  };
};

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [gender, setGender] = useState<Gender>('');
  const [pageToGet, setPageToGet] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getUsers = async (page: number) => {
    if (isInitialLoading) {
      setIsInitialLoading(true);
    } else {
      setIsLoading(true);
    }

    const result = await fetch(
      `${currentEnvironment.api.baseUrl}?results=5&gender=${gender}&page=${String(page)}`
    );
    const data = await result.json();
    const usersResults = data.results as User[];

    setUsers((oldUsers) => (page === 1 ? usersResults : [...oldUsers, ...usersResults]));

    setIsLoading(false);
    setIsInitialLoading(false);
  };

  useEffect(() => {
    void (async () => {
      await getUsers(pageToGet);
    })();
  }, [pageToGet, gender]);

  const filteredUsers = users.filter(user =>
    user.name.first.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.name.last.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.usersContainer}>
      <div className={styles.genderSelector}>
        <label htmlFor="gender">Select Gender</label>
        <select
          id="gender"
          name="gender"
          onChange={(event) => {
            setGender(event.target.value as Gender);
            setIsInitialLoading(true);
            setPageToGet(1);
          }}
        >
          <option value="">All</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
      </div>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {isInitialLoading ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        <ul>
          {filteredUsers.length > 0
            ? filteredUsers.map((user: User) => (
              <li key={user.login.uuid} className={styles.userItem}>
                <span className={styles.userName}>
                  {user.name.first} {user.name.last}
                </span>
                <span className={styles.userGender}>
                  {user.gender}
                </span>
              </li>
            ))
            : <li>No users found.</li>}
        </ul>
      )}
      {isLoading && !isInitialLoading && <div className={styles.loading}>Loading more...</div>    && <div className={styles.spinner}></div>}
      <button
        className={styles.loadButton}
        type="button"
        onClick={() => {
          setPageToGet((v) => v + 1);
        }}
      >
        Load More
      </button>
    </div>
  );
};

export default Users;
