import { useLayoutEffect } from 'react';

function useBodyScrollLock() {
  useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    document.getElementById('root').style.paddingRight = '17px';
    document.querySelector('.header_middle').style.transform =
      'translateX(-6px)';
    document.querySelector('.header_right').style.right = '25px';

    return () => {
      document.body.style.overflow = originalStyle;
      document.getElementById('root').style.paddingRight = '';
      document.querySelector('.header_right').style.right = '';
      document.querySelector('.header_middle').style.transform = '';
    };
  }, []);
}

export default useBodyScrollLock;
