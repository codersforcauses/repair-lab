import { Fragment, ReactNode } from "react";
import dynamic from "next/dynamic";

const NoSsr = (props: { children: ReactNode }) => (
  <Fragment>{props.children}</Fragment>
);

export default dynamic(() => Promise.resolve(NoSsr), {
  ssr: false
});
