import AppLayout from "@/components/layout/AppLayout";
import HomeHeader from "@/components/home/HomeHeader";
import SearchBar from "@/components/home/SearchBar";
import MainCard from "@/components/home/MainCard";

const user = { name: "Eduardo", isLoggedIn: true };

const Index = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <HomeHeader userName={user.name} />
        <SearchBar />
        <MainCard />
      </div>
    </AppLayout>
  );
};

export default Index;
