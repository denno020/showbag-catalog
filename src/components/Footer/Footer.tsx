import { postEvent } from '../../utils/analytics';
import DonationLink from '../DonationLink/DonationLink';

const Footer = () => {
  const handleClickDonationLink = () => {
    postEvent('donation-link-clicked');
  };

  return (
    <footer className="container mx-auto py-3 mt-6">
      <div className="container flex px-3 py-8">
        <div className="w-full mx-auto flex flex-wrap">
          <div className="flex w-full lg:w-1/2 ">
            <div className="px-3 md:px-0">
              <h3 className="font-bold text-gray-900">About</h3>
              <p>
                <em>Prices are for reference only</em>
              </p>
              <p className="py-4">
                Find this app useful and want to say thanks? In honour of Steptember, and all the steps you'll be taking
                to pick up your showbags, please consider donating to the{' '}
                <DonationLink>Cerebal Palsy Alliance</DonationLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
