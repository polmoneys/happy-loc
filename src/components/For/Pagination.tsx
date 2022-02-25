import Button from "@/components/Button/Button";
import Shelf from "@/components/Shelf/Shelf";

interface Props {
  count: number;
  current: number;
  handleChange: (event: unknown, page: number) => void;
}

const Pagination = (props: Props) => {
  const { count, handleChange, current } = props;
  const pages: Array<unknown> = [];
  for (let i = 1; i <= count; i++) {
    pages.push(
      <Button
        key={i}
        color="text"
        ring={false}
        stretch={current === i}
        onClick={e => handleChange(e, i)}
      >
        {i}
      </Button>
    );
  }
  return <Shelf gap="var(--border-width)">{pages}</Shelf>;
};

export default Pagination;

interface Pager {
  currentPage: number;
  firstPage: number;
  lastPage: number;
  nextPage: number;
  previousPage: number;
  totalItems: number;
  totalPages: number;
}

export function paginateArray<T>(
  items: T[],
  currentPage = 1,
  itemsPerPage = 10
) {
  const offset = (currentPage - 1) * itemsPerPage;
  const data = items.slice(offset).slice(0, itemsPerPage);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const pager: Pager = {
    currentPage,
    firstPage: 1,
    lastPage: totalPages,
    nextPage: totalPages > currentPage ? currentPage + 1 : totalPages,
    previousPage: currentPage - 1 > 0 ? currentPage - 1 : 1,
    totalItems: items.length,
    totalPages,
  };

  return {
    data,
    pager,
  };
}
