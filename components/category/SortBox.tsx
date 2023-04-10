type Props = {
  sortChange: (num: number) => true | undefined;
};

const SortBox = ({ sortChange }: Props) => {
  return (
    <div className="absolute top-full right-0 border border-black bg-white z-10 w-36">
      <ul>
        <li>
          <button
            className="px-2.5 py-2 text-sm font-futura hover:bg-gray-100 w-full text-left transition"
            onClick={() => sortChange(0)}
          >
            NEW ARRIVALS
          </button>
        </li>
        <li>
          <button
            className="px-2.5 py-2 text-sm font-futura hover:bg-gray-100 w-full text-left transition"
            onClick={() => sortChange(1)}
          >
            PRICE LOW
          </button>
        </li>
        <li>
          <button
            className="px-2.5 py-2 text-sm font-futura hover:bg-gray-100 w-full text-left transition"
            onClick={() => sortChange(2)}
          >
            PRICE HIGH
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SortBox;
