import { styled } from '@mui/material';
import { Flex } from '@radix-ui/themes';

// Styled Page component
const Page = styled(Flex)({
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  background: '#f0f4f8',
});

// Content added directly into the Page component
const PageWithContent = () => {
  return (
    <Page>
      <h1>Welcome to Lexter Lens</h1>
      <p>Simple example of styled content with Radix and MUI.</p>
      <button
        style={{
          marginTop: '10px',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          backgroundColor: '#007bff',
          color: '#fff',
          cursor: 'pointer',
        }}
        onClick={() => alert('Button clicked!')}
      >
        Click Me
      </button>
    </Page>
  );
};

export default PageWithContent;


// import { styled } from '@mui/material'
// import { Flex } from '@radix-ui/themes'

// export const Page = styled(Flex)({
//   flexDirection: 'column',
// });