import React from 'react';

import Aux from '../../hoc/AuxHoc';

const layout = props => {
  return (
    <Aux>
      <div>ToolBar, SideBar,Backdrop</div>
      <main>{props.children}</main>
    </Aux>
  );
};

export default layout;
