import React from "react";

export const isEmptyChildren = children => React.Children.count(children) === 0;
export const isChildFunction = (children) => typeof children === "function";
export const hasChildrenToRender = children => children && !isEmptyChildren(children);
export const shouldRenderCurrent = (currentNavigationId, navigationId) => currentNavigationId === navigationId;