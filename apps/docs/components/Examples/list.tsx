import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { List, ListItem, OrderedList, UnorderedList } from "@rafty/ui";

export const list_examples = {
  "list:usage": (
    <List>
      <ListItem>Lorem ipsum dolor sit amet</ListItem>
      <ListItem>Consectetur adipiscing elit</ListItem>
      <ListItem>Integer molestie lorem at massa</ListItem>
      <ListItem>Facilisis in pretium nisl aliquet</ListItem>
    </List>
  ),
  "list:order_list": (
    <OrderedList>
      <ListItem>Lorem ipsum dolor sit amet</ListItem>
      <ListItem>Consectetur adipiscing elit</ListItem>
      <ListItem>Integer molestie lorem at massa</ListItem>
      <ListItem>Facilisis in pretium nisl aliquet</ListItem>
    </OrderedList>
  ),
  "list:unorder_list": (
    <UnorderedList>
      <ListItem>Lorem ipsum dolor sit amet</ListItem>
      <ListItem>Consectetur adipiscing elit</ListItem>
      <ListItem>Integer molestie lorem at massa</ListItem>
      <ListItem>Facilisis in pretium nisl aliquet</ListItem>
    </UnorderedList>
  ),
  "list:unstyled": (
    <List>
      <ListItem
        isUnstyled
        className="flex items-center gap-2 text-xl font-bold "
      >
        <CheckCircleIcon height={16} width={16} />
        Lorem ipsum dolor sit amet, consectetur adipisicing elit
      </ListItem>
      <ListItem className="flex items-center gap-2">
        <CheckCircleIcon height={16} width={16} />
        Assumenda, quia temporibus eveniet a libero incidunt suscipit
      </ListItem>

      <ListItem className="flex items-center gap-2">
        <CheckCircleIcon height={16} width={16} />
        Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
      </ListItem>
      <ListItem className="flex items-center gap-2">
        <CheckCircleIcon height={16} width={16} />
        Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
      </ListItem>
    </List>
  ),
};
