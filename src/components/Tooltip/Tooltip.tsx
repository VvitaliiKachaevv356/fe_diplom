import './tooltip.css';

const Tooltip = ({ text }: { text: string }) => {
  return <div className="tooltip">{text}</div>;
};

export default Tooltip;
