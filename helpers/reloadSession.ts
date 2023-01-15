// hacky way to reload the next-auth session
// see: https://stackoverflow.com/questions/70405436/next-auth-how-to-update-the-session-client-side
export const reloadSession = () => {
  const event = new Event('visibilitychange');
  document.dispatchEvent(event);
};
