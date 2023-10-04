function makeFriendsList(friends) {
  let friendsList = document.createElement (`ul`);
  for (let friend of friends) {
    let friendTemp = document.createElement('li');
    friendTemp.innerHTML = `${friend.firstName} ${friend.lastName}`;
    friendsList.append(friendTemp);
  }
  return friendsList;
}
