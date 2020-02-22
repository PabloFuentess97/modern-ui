import React, { useState, useEffect } from "react";
/**
 * Dependencies
 */
import { orderBy, filter } from "lodash";
import { useSpring, animated } from "react-spring";
import OnOutsideClick from "react-outclick";
import useDebounce from "hooks/useDebounce";

/**
 * Components
 */
import FriendlistItem from "components/FriendlistItem";
import { IUser } from "models/user/IUser";
import UsersList from "components/UsersList";
import { getUsersByUsername } from "api/fakeApi";

const FriendsTab = () => {
  const friends: any[] = [];

  const [searchExpanded, setSearchExpanded] = useState(false);

  const searchExpandAnim = useSpring({
    maxHeight: searchExpanded ? "100px" : "0px",
    opacity: searchExpanded ? 1 : 0
  });

  const searchBarAnim = useSpring({
    backgroundColor: searchExpanded ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0)"
  });

  /**
   * User search
   */
  const [userSearch, setUserSearch] = useState("");
  const [isSearching, setIsSearching] = useState(true);
  const debouncedUserSearch = useDebounce(userSearch, 300);

  // Store fetched users.
  const [fetchedUsers, setFetchedUsers] = useState(Array(0));

  /**
   * Fetch users when debouncedUserSearch value changes and set isSearching value accordingly.
   */
  useEffect(() => {
    if (debouncedUserSearch) {
      setIsSearching(true);
      setFetchedUsers([]);

      getUsersByUsername(debouncedUserSearch).then(users => {
        setIsSearching(false);
        setFetchedUsers(users);
      });
    }
  }, [debouncedUserSearch]);

  /**
   * Render tab content
   */
  const renderContent = () => {
    if (debouncedUserSearch) {
      return (
        <div>
          <UsersList users={fetchedUsers} loading={isSearching} />
        </div>
      );
    }

    if (friends.length)
      return (
        <>
          <h4 className="text-gray-500 mb-1 self-center text-xs font-semibold self-center mt-1">
            Friends (
            {
              filter(friends, o => {
                if (o.online) return o;
              }).length
            }{" "}
            online)
          </h4>
          <div className="w-full border border-gray-400 bg-gray-100 rounded dark:bg-gray-800 dark:border-gray-700">
            {orderBy(friends, ["online"], "desc").map((friend, idx) => (
              <FriendlistItem key={idx} user={friend} />
            ))}
          </div>
        </>
      );

    return (
      <div className="flex flex-col mt-2 relative">
        <div className="absolute top-0 right-0 h-full w-full flex justify-center">
          <div className="flex flex-col justify-center bg-gradient-b-gray-200 dark:bg-gradient-b-gray-900">
            <span className="text-2xl font-semibold text-gray-500 dark:text-gray-600 text-center">
              No friends!
            </span>
            <span className="text-gray-600 text-sm px-10 text-center">
              You have no friends in your friendlist. Enter the hotel to meet
              new people!
            </span>
          </div>
        </div>
        {[...Array(5)].map((_, idx) => (
          <div className="w-full p-1 flex rounded mb-1" key={idx}>
            <div className="h-12 w-12 rounded bg-gray-300 dark:bg-gray-800 flex-shrink-0"></div>
            <div className="w-full flex flex-col pl-2">
              <div className="w-full bg-gray-300 dark:bg-gray-800 rounded-sm h-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-2">
      {/* Search friends */}
      <OnOutsideClick onOutsideClick={(ev: Event) => setSearchExpanded(false)}>
        <div
          style={searchBarAnim}
          className="flex w-full flex-wrap bg-gray-300 rounded text-sm dark:bg-gray-900"
        >
          <div>
            <i
              className={`fas fa-search self-center p-2 text-sm ${
                !userSearch
                  ? "text-gray-500 dark:text-gray-600"
                  : "text-blue-500"
              }`}
              style={{ transition: "color 350ms" }}
            />
          </div>
          <input
            className="flex-1 py-1 px-1 pb-1 bg-transparent dark:text-gray-600 dark:placeholder-gray-600"
            type="text"
            placeholder="Search Habbos..."
            onFocus={() => setSearchExpanded(true)}
            onChange={e => setUserSearch(e.target.value)}
          />
          <animated.div
            style={searchExpandAnim}
            className="flex w-full overflow-hidden"
          >
            <div className="p-1 w-full flex-wrap flex">
              <h4 className="w-full font-semibold dark:text-gray-600">
                Filter
              </h4>
              <label
                htmlFor="filter-friends"
                className="text-xs dark:text-gray-600 flex"
              >
                <input
                  id="filter-friends"
                  type="checkbox"
                  className="self-center mr-1"
                />
                Friends only
              </label>
            </div>
          </animated.div>
        </div>
      </OnOutsideClick>

      {renderContent()}
    </div>
  );
};

export default FriendsTab;