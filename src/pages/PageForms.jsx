import React from "react";
import { Segment } from 'semantic-ui-react';
import AppForms from "../components/AppForms";

const PageForms = () => {
	return (
		<div className="forms-page">
      <Segment>
			  <AppForms />
      </Segment>
		</div>
	);
};
export default PageForms;
