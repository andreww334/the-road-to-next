import { AccountTabs } from "@/app/(authenticated)/account/_navigation/tabs";
import { Heading } from "@/components/Heading";

const ProfilePage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Profile"
        description="Your profile information"
        tabs={<AccountTabs />}
      />
    </div>
  );
};

export default ProfilePage;
