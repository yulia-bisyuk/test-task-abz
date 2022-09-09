import { useEffect, useState } from 'react';
import { useGetUsersQuery } from 'redux/users/usersApi';
import ClipLoader from 'react-spinners/ClipLoader';
import dummy from '../icons/user.svg';
import '../styles/components/users/users.css';

export const Users = ({ page, setPage }) => {
  const [users, setUsers] = useState([]);
  const { data, isSuccess, isFetching } = useGetUsersQuery(page);

  useEffect(() => {
    if (isSuccess && page === 1) {
      setUsers([...data.users]);
    }
    if (isSuccess && page > 1)
      setUsers(prevUsers => [...new Set([...prevUsers, ...data.users])]);
  }, [isSuccess, data, page]);

  const phoneFormatter = numbers => {
    let phone =
      numbers[0] === '+' ? 'xxx (xxx) xxx xx xx' : '+xx (xxx) xxx xx xx';

    for (var i = 0; i < numbers.length; i++) {
      phone = phone.replace('x', numbers[i]);
    }

    return phone;
  };

  return (
    <section className="users">
      <div className="container">
        <h1 className="usersTitle" id="users">
          Working with GET request
        </h1>
        <ul className="usersList">
          {isSuccess &&
            users
              .sort(
                (a, b) => b.registration_timestamp - a.registration_timestamp
              )
              .map(user => (
                <li key={user.id} className="usersListItem">
                  <img
                    className="usersListItemImage"
                    alt="user"
                    src={
                      user.photo.includes('placeholder')
                        ? dummy + '#user-icon'
                        : user.photo
                    }
                    width="70"
                    height="70"
                  />
                  <p
                    className={
                      user.name.length > 32
                        ? 'cutText usersListItemName'
                        : 'usersListItemName'
                    }
                    data-text={user.name}
                  >
                    {user.name}
                  </p>
                  <p
                    className={user.position.length > 32 ? 'cutText' : null}
                    data-text={user.position}
                  >
                    {user.position}
                  </p>
                  <a
                    className={user.email.length > 32 ? 'cutText' : null}
                    data-text={user.email}
                    aria-label="Mail"
                    href={`mailto:${user.email}`}
                  >
                    {user.email}
                  </a>
                  <a
                    className="usersListItemPhone"
                    aria-label="Phone"
                    href={`tel:${user.phone}`}
                  >
                    {phoneFormatter(Array.from(user.phone))}
                  </a>
                </li>
              ))}
        </ul>

        {isFetching && (
          <div className="loaderWrapper">
            <ClipLoader color="#00bdd3" size="48px" />
          </div>
        )}

        {isSuccess && page !== data.total_pages && (
          <button
            onClick={() => setPage(page + 1)}
            className="usersShowMoreBtn"
            type="button"
          >
            Show more
          </button>
        )}
      </div>
    </section>
  );
};
