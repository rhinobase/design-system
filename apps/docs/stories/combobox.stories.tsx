import { Meta, StoryObj } from "@storybook/react";
import { Combobox } from "@rafty/ui";

const meta: Meta<typeof Combobox> = {
  title: "Form / Combobox",
};

export default meta;

type Story = StoryObj<typeof Combobox>;
const CLIENT_ID = "qtSiDbipH06mlQxvVz7alCSFDXnPeEnH446DOxBd-sQ";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export const Default: Story = {
  render: function Render() {
    return (
      <Combobox
        options={frameworks}
        placeholder="Select a framework"
        inputPlaceholder="Search a framework...."
      />
    );
  },
};

// export const InfiniteScroll: Story = {
//   render: function Render() {
//     const isFocused = useRef(false);
//     const [search, setSearch] = useState<string>();
//     const [selected, setSelected] = useState<string>();

//     const { data, isFetching, hasNextPage, fetchNextPage, isLoading } =
//       useInfiniteQuery({
//         queryKey: ["photos", search && !selected ? search : undefined],
//         queryFn: async ({ pageParam = 0 }) => {
//           const res = await fetch(
//             search && !selected
//               ? `https://api.unsplash.com/search/photos?client_id=${CLIENT_ID}&query=${search}&page=${
//                   pageParam + 1
//                 }`
//               : `https://api.unsplash.com/photos?client_id=${CLIENT_ID}&page=${
//                   pageParam + 1
//                 }`
//           );
//           const jsonData = await res.json();

//           if (search) return jsonData.results;
//           return jsonData;
//         },
//         getNextPageParam: (lastPage, pages) => {
//           if (lastPage.length == 0) return undefined;
//           return pages.length;
//         },
//       });

//     const observer = useRef<IntersectionObserver>();
//     const lastElement = useCallback(
//       (node: HTMLDivElement) => {
//         if (isFetching) return;
//         if (observer.current) observer.current.disconnect();
//         observer.current = new IntersectionObserver((entries) => {
//           if (entries[0].isIntersecting && hasNextPage) fetchNextPage();
//         });
//         if (node) observer.current?.observe(node);
//       },
//       [isFetching, hasNextPage]
//     );

//     const pages = data?.pages.flat() ?? [];
//     const page_length = pages.length;

//     useEffect(() => {
//       // If selected exists and combobox is not focused, update the input value with the selected key text
//       // This allows the input value to be up to date when items load for the first time or the selected key text is updated server side.
//       if (!isFocused.current && selected) {
//         const element = pages.find((item) => item.id === selected);
//         if (element && element !== search) {
//           setSearch(element.alt_description);
//         }
//       }
//     }, [isFocused, selected]);

//     const options = [];

//     console.log(search, selected, page_length);

//     if (page_length != 0)
//       options.push(
//         ...(pages.map((item, index) => (
//           <ComboboxItem key={item.id} textValue={item.alt_description}>
//             <div
//               className="flex items-center gap-2"
//               ref={page_length == index + 1 ? lastElement : undefined}
//             >
//               <img
//                 src={item.urls.thumb}
//                 alt={item.alt_description}
//                 className="h-10 w-10 rounded object-cover"
//               />
//               {item.alt_description}
//             </div>
//           </ComboboxItem>
//         )) ?? [])
//       );
//     else if (isLoading)
//       options.push(
//         <ComboboxItem>
//           <div className="flex h-8 w-full items-center justify-center gap-2 text-sm text-secondary-500">
//             <Spinner size="sm" />
//             loading data
//           </div>
//         </ComboboxItem>
//       );
//     else
//       options.push(
//         <ComboboxItem>
//           <div className="flex h-8 w-full items-center justify-center text-sm text-secondary-500">
//             No data found
//           </div>
//         </ComboboxItem>
//       );

//     if (!isLoading && isFetching)
//       options.push(
//         <ComboboxItem>
//           <div className="flex h-8 w-full items-center justify-center gap-2 text-sm text-secondary-500">
//             <Spinner size="sm" />
//             loading more data
//           </div>
//         </ComboboxItem>
//       );

//     function onInputChange(value: string) {
//       if (value == "" || selected != search) setSelected(undefined);
//       setSearch(value);
//     }

//     function onSelectionChange(key: React.Key) {
//       const element = pages.find((item) => item.id == key);
//       if (element) {
//         setSelected(element.id);
//         setSearch(element.alt_description);
//       } else {
//         setSelected(undefined);
//         setSearch(undefined);
//       }
//     }

//     return (
//         <Combobox
//           label="Select Image"
//           onFocusChange={(focus) => (isFocused.current = focus)}
//           inputValue={search}
//           onInputChange={onInputChange}
//           selectedKey={selected}
//           onSelectionChange={onSelectionChange}
//           isLoading={isLoading || isFetching}
//         >
//           {options}
//         </Combobox>
//     );
//   },
// };
