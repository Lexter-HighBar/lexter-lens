import { Page } from "../components/layout/Page"
import FirmSearch from "../components/FirmSearch";


const Home = () => {
  return (
    <Page>
        {/* FirmSearch Component */}
        <div style={{ margin: '20px 0' }}>
            <FirmSearch />
        </div>
    </Page>
  )
}

export default Home