import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return ((
    <div>
      404 (not found)
      {t('goTo')}
      <Link to="/login">
        {' '}
        {t('autorizationPage')}
      </Link>
    </div>
  ));
};

export default NotFoundPage;
