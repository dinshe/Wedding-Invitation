import { useState, useEffect } from 'react';
import { InviteeInfo } from '../types/wedding';
import { parseInviteeParams } from '../utils/urlParams';

export function useInvitee(): InviteeInfo {
  const [invitee, setInvitee] = useState<InviteeInfo>(() => parseInviteeParams());

  useEffect(() => {
    const handlePopState = () => {
      setInvitee(parseInviteeParams());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return invitee;
}

export default useInvitee;
