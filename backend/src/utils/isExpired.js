function isExpired(expireTime) {
  const currentTime = Date.now();
  return currentTime > expireTime;
}

export default isExpired;
