import OrderList from "@/components/account/OrderList";
import Profile from "@/components/account/Profile";
import { useLogout } from "@/hooks/useAuth";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

const Account = () => {
  const logout = useLogout();

  return (
    <section>
      <Tabs className="md:flex">
        <div className="md:w-2/5 md:border-r border-b md:border-b-0 border-black px-[6vw] md:px-10 pt-10 md:pt-20 pb-10 md:pb-48">
          <h1 className="text-2xl md:text-4xl mb-8 md:mb-10 font-futura">
            ACCOUNT
          </h1>
          <TabList className="w-14">
            <Tab className="cursor-pointer mb-3 text-base md:text-lg font-futura focus:outline-none">
              PROFILE
            </Tab>
            <Tab className="cursor-pointer mb-3 text-base md:text-lg font-futura focus:outline-none">
              ORDERS
            </Tab>
          </TabList>
          <button className="text-base md:text-lg font-futura" onClick={logout}>
            LOGOUT
          </button>
        </div>
        <div className="px-[6vw] xl:px-24 py-8 md:py-12 md:w-3/5">
          <TabPanel>
            <Profile />
          </TabPanel>
          <TabPanel>
            <OrderList />
          </TabPanel>
        </div>
      </Tabs>
    </section>
  );
};

export default Account;
