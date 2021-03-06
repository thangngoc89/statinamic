import React, { PropTypes } from "react"
import cx from "classnames"

import { Link as RouterLink } from "react-router"

export const Link = (props, { router }) => (
  <RouterLink
    { ...props }
    className={ cx({
      [props.className]: true,
      [props.activeClassName]: (router && (
        router.isActive({ pathname: props.to }) ||
        router.isActive({ pathname: props.to + "index.html" })
      )),
    }) }
  >
    { props.children }
  </RouterLink>
)

Link.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
  activeClassName: PropTypes.string,
}

Link.contextTypes = {
  router: PropTypes.object.isRequired,
}

Link.displayName = "Link"

/*
  exported as default and Link so people can easily switch their
  import { Link } from "react-router"
  to
  import { Link } from "statinamic/lib/Link"
  or
  import Link from "statinamic/lib/Link"
*/
export default Link
