import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Link from "next/link";
import React, { Children, useContext } from "react";
import ThemeContext from "../../theme/Context";

const ActiveLink = ({ children, ...props }) => {
  const { asPath } = useRouter();
  const child = Children.only(children);
  const childClassName = child.props.className || "link";
  const { activeLinkClass } = useContext(ThemeContext);

  const className =
    asPath === props.href || asPath === props.as
      ? `${childClassName} ${activeLinkClass}`.trim()
      : childClassName;

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  );
};

export default ActiveLink;
