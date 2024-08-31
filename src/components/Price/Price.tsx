type PriceProps = {
  value: number | string;
};

const Price = (props: PriceProps) => {
  const { value } = props;

  const price = new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD'
  }).format(Number(value));

  return <span>{price.replace('.00', '')}</span>;
};

export default Price;
