import React from "react";

function Tooltip() {
  return (
    <div>
      <button
        type="button"
        class="btn btn-secondary"
        data-toggle="tooltip"
        data-placement="top"
        title="Tooltip on top"
      >
        Tooltip on top
      </button>
    </div>
  );
}

export default Tooltip;
