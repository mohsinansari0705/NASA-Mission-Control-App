import { useContext, useEffect } from 'react';
import { LayoutContext } from './LayoutContext';

export function useBottomBar(
  visible: boolean,
  selectedId?: 'launch' | 'upcoming' | 'history'
) {
  const { setLayoutContext } = useContext(LayoutContext);

  useEffect(() => {
    setLayoutContext((old) => old.setBottomBar(old, visible, selectedId));
  }, [visible, selectedId, setLayoutContext]);
}
