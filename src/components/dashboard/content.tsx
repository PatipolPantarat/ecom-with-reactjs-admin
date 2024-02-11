import {
  ShoppingBagIcon,
  ShoppingCartIcon,
  ChartBarIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import ContentBox from "../contentBox";

export default function Content() {
  return (
    <div className="grid grid-cols-4 gap-5">
      <ContentBox className="flex">
        <div className="bg-success-light p-4 rounded-lg">
          <ShoppingBagIcon className="h-6 w-6 text-success" />
        </div>
        <div className="ms-5">
          <p className="text-lg font-bold text-dark">365</p>
          <p className="text-md font-medium text-dark-400">Orders</p>
        </div>
      </ContentBox>
      <ContentBox className="flex">
        <div className="bg-danger-light p-4 rounded-lg">
          <ShoppingCartIcon className="h-6 w-6 text-danger" />
        </div>
        <div className="ms-5">
          <p className="text-lg font-bold text-dark">$5365</p>
          <p className="text-md font-medium text-dark-400">Sales</p>
        </div>
      </ContentBox>
      <ContentBox className="flex">
        <div className="bg-info-light p-4 rounded-lg">
          <ChartBarIcon className="h-6 w-6 text-info" />
        </div>
        <div className="ms-5">
          <p className="text-lg font-bold text-dark">2860+</p>
          <p className="text-md font-medium text-dark-400">Average sales</p>
        </div>
      </ContentBox>
      <ContentBox className="flex">
        <div className="bg-warning-light p-4 rounded-lg">
          <UserIcon className="h-6 w-6 text-warning" />
        </div>
        <div className="ms-5">
          <p className="text-lg font-bold text-dark">4800+</p>
          <p className="text-md font-medium text-dark-400">Customers</p>
        </div>
      </ContentBox>
    </div>
  );
}
