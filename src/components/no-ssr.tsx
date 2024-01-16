import { Fragment, ReactNode } from "react";
import dynamic from "next/dynamic";

const NoSsr = (props: { children: ReactNode }) => (
  <Fragment>{props.children}</Fragment>
);
/**
 * Stop next.js pre-rendering component, mostly used for debugging during dev
 */
export default dynamic(() => Promise.resolve(NoSsr), {
  ssr: false
});
