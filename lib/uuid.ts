export function generate_uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var uuid = (Math.random() * 16) | 0,
      v = c == "x" ? uuid : (uuid & 0x3) | 0x8;
    return uuid.toString(16);
  });
}

export function isUUID(str: string) {
  // Regular expression pattern for UUID
  const uuidPattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidPattern.test(str);
}
