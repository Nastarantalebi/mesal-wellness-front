import { createContext, useContext } from "react";
import { twMerge } from "tailwind-merge";

/* -------------------------------------------------------------------------- */
/*                                   Contexts                                 */
/* -------------------------------------------------------------------------- */

interface TableProps
  extends React.PropsWithChildren,
    React.ComponentPropsWithoutRef<"table"> {
  dark?: boolean;
  bordered?: boolean;
  hover?: boolean;
  striped?: boolean;
  sm?: boolean;
}

interface TableContextValue {
  dark: boolean;
  bordered: boolean;
  hover: boolean;
  striped: boolean;
  sm: boolean;
}

const TableContext = createContext<TableContextValue>({
  dark: false,
  bordered: false,
  hover: false,
  striped: false,
  sm: false,
});

interface TheadProps
  extends React.PropsWithChildren,
    React.ComponentPropsWithoutRef<"thead"> {
  variant?: "default" | "light" | "dark";
}

const TheadContext = createContext<{ variant: TheadProps["variant"] }>({
  variant: "default",
});

/* -------------------------------------------------------------------------- */
/*                                   Table                                    */
/* -------------------------------------------------------------------------- */

export const Table = ({
  className,
  dark = false,
  bordered = false,
  hover = false,
  striped = false,
  sm = false,
  children,
  ...props
}: TableProps) => {
  return (
    <TableContext.Provider value={{ dark, bordered, hover, striped, sm }}>
      <table
        className={twMerge([
          "w-full text-start border-collapse",
          dark && "bg-dark text-white dark:bg-black/30",
          className,
        ])}
        {...props}
      >
        {children}
      </table>
    </TableContext.Provider>
  );
};

/* -------------------------------------------------------------------------- */
/*                                   Thead                                    */
/* -------------------------------------------------------------------------- */

const TableThead = ({
  className,
  variant = "default",
  ...props
}: TheadProps) => {
  return (
    <TheadContext.Provider value={{ variant }}>
      <thead
        className={twMerge([
          variant === "light" && "bg-slate-200/60 dark:bg-slate-200",
          variant === "dark" && "bg-dark text-white dark:bg-black/30",
          className,
        ])}
        {...props}
      >
        {props.children}
      </thead>
    </TheadContext.Provider>
  );
};

/* -------------------------------------------------------------------------- */
/*                                   Tbody                                    */
/* -------------------------------------------------------------------------- */

type TbodyProps = React.PropsWithChildren<
  React.ComponentPropsWithoutRef<"tbody">
>;

const TableTbody = ({ className, ...props }: TbodyProps) => {
  return <tbody className={className} {...props} />;
};

/* -------------------------------------------------------------------------- */
/*                                    Tr                                      */
/* -------------------------------------------------------------------------- */

type TrProps = React.PropsWithChildren<React.ComponentPropsWithoutRef<"tr">>;

const TableTr = ({ className, ...props }: TrProps) => {
  const table = useContext(TableContext);
  return (
    <tr
      className={twMerge([
        table.hover &&
          "[&:hover_td]:bg-slate-100 [&:hover_td]:dark:bg-darkmode-300 [&:hover_td]:dark:bg-opacity-50",
        table.striped &&
          "[&:nth-of-type(odd)_td]:bg-slate-100 [&:nth-of-type(odd)_td]:dark:bg-darkmode-300 [&:nth-of-type(odd)_td]:dark:bg-opacity-50",
        className,
      ])}
      {...props}
    >
      {props.children}
    </tr>
  );
};

/* -------------------------------------------------------------------------- */
/*                                    Th                                      */
/* -------------------------------------------------------------------------- */

type ThProps = React.PropsWithChildren<React.ComponentPropsWithoutRef<"th">>;

const TableTh = ({ className, ...props }: ThProps) => {
  const table = useContext(TableContext);
  const thead = useContext(TheadContext);

  return (
    <th
      className={twMerge([
        "font-medium px-5 py-3 border-b-2 dark:border-darkmode-300 text-start",
        thead.variant === "light" && "border-b-0 text-slate-700",
        thead.variant === "dark" && "border-b-0",
        table.dark && "border-slate-600 dark:border-darkmode-300",
        table.bordered && "border-s border-e border-t",
        table.sm && "px-4 py-2",
        className,
      ])}
      {...props}
    >
      {props.children}
    </th>
  );
};

/* -------------------------------------------------------------------------- */
/*                                    Td                                      */
/* -------------------------------------------------------------------------- */

type TdProps = React.PropsWithChildren<React.ComponentPropsWithoutRef<"td">>;

const TableTd = ({ className, ...props }: TdProps) => {
  const table = useContext(TableContext);

  return (
    <td
      className={twMerge([
        "px-5 py-3 border-b dark:border-darkmode-300",
        table.dark && "border-slate-600 dark:border-darkmode-300",
        table.bordered && "border-s border-e border-t",
        table.sm && "px-4 py-2",
        className,
      ])}
      {...props}
    >
      {props.children}
    </td>
  );
};

/* -------------------------------------------------------------------------- */
/*                             Attach subcomponents                           */
/* -------------------------------------------------------------------------- */

Table.Thead = TableThead;
Table.Tbody = TableTbody;
Table.Tr = TableTr;
Table.Th = TableTh;
Table.Td = TableTd;

export default Table;
