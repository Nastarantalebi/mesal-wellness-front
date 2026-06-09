const useRedirect = () => {
  const redirectUrl = import.meta.env.VITE_REDIRECT_URL;
  const redirectUrlOrg = import.meta.env.VITE_REDIRECT_ORG_URL;

  const redirect = `${redirectUrl}?redirect=${window.location.href}`;
  const redirectOrg = `${redirectUrlOrg}?redirect=${window.location.href}`;

  return { redirect, redirectOrg };
};

export default useRedirect;
