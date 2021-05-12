import Styled from 'styled-components';

export default function Test({}) {
  return (
    <div className="flex">
      <SideBar />
      <Dashboard />
    </div>
  );
}

const SideBarStyled = ({ className }) => {
  return <div className={className}>SideBar</div>;
};

const DashboardStyled = ({ className }) => {
  return <div className={className}>SideBar</div>;
};

const SideBar = Styled(SideBarStyled)({
  background: 'coral',
  width: '10vw',
  minWidth: 'calc(10vw + 10px)',
  position: 'fixed',
  height: '100vh',
});

const Dashboard = Styled(DashboardStyled)({
  background: 'grey',
  width: '90vw',
  marginLeft: 'auto',
  minHeight: '2000px',
});
