import React, { createContext } from 'react';

export type BottomTabId = 'launch' | 'upcoming' | 'history';

export class LayoutData {
  bottomBarVisible = true;
  bottomBarSelectedId = 'launch';
  bottomBarHeight = 0;
  headerHeight = 0;

  setBottomBar(
    old: LayoutData,
    visible?: boolean,
    selectedId?: BottomTabId,
    height?: number
  ) {
    const next = new LayoutData();

    next.bottomBarVisible = visible ?? old.bottomBarVisible;
    next.bottomBarSelectedId = selectedId ?? old.bottomBarSelectedId;
    next.bottomBarHeight = height ?? old.bottomBarHeight;
    next.headerHeight = old.headerHeight;

    return next;
  }

  setHeader(old: LayoutData, height?: number) {
    const next = new LayoutData();

    next.bottomBarVisible = old.bottomBarVisible;
    next.bottomBarSelectedId = old.bottomBarSelectedId;
    next.bottomBarHeight = old.bottomBarHeight;
    next.headerHeight = height ?? old.headerHeight;

    return next;
  }
}

type LayoutContextData = {
  layoutContext: LayoutData;
  setLayoutContext: React.Dispatch<React.SetStateAction<LayoutData>>;
};

export const LayoutContext = createContext<LayoutContextData>({
  layoutContext: new LayoutData(),
  setLayoutContext: () => {},
});
