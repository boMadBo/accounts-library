import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchLogout } from '@/rdx/reducers/loginSlice';
import HeaderButton from '@/uikit/HeaderButton';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import style from './Header.module.css';

const Header = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.loginSlice.isAuth);
  const location = useLocation();

  const handleLogoutClick = () => {
    dispatch(fetchLogout());
  };
  function doNothing() {}

  const { pathname } = location;

  const [link, text] = useMemo(() => {
    let link = '';
    let text = '';

    if (pathname === '/account') {
      link = '/users';
      text = 'Users';
    } else if (pathname === '/users') {
      link = '/account';
      text = 'Account';
    } else if (pathname === '/register') {
      link = '/login';
      text = 'Sign in';
    } else if (pathname === '/login') {
      link = '/register';
      text = 'Registration';
    }

    return [link, text];
  }, [pathname]);

  const hideRoute = location.pathname === '/' ? null : <HeaderButton link={link} text={text} click={doNothing} />;
  const hideLogout = isAuth ? <HeaderButton link="" text="Sign out" click={handleLogoutClick} /> : null;
  return (
    <header className={style.header}>
      <div className={style.navi}>
        <LocalLibraryIcon className={style.icon} />
        <div className={style.title}>Account Library</div>
      </div>
      <div className={style.navi}>
        {hideRoute}
        {hideLogout}
      </div>
    </header>
  );
};

export default React.memo(Header);
