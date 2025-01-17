import React, { Fragment, useMemo } from 'react';

import ActionMenuButton from '@/components/ActionMenuButton';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ButtonViewReturnComponentProps } from '@/types';
import { getShortcutKey } from '@/utils/plateform';

export interface Item {
  title: string;
  icon?: any;
  level?: number;
  isActive: NonNullable<ButtonViewReturnComponentProps['isActive']>;
  action?: ButtonViewReturnComponentProps['action'];
  style?: React.CSSProperties;
  shortcutKeys?: string[];
  disabled?: boolean;
  divider?: boolean;
  default?: boolean;
}

interface Props {
  editor: any;
  disabled?: boolean;
  color?: string;
  shortcutKeys?: string[];
  maxHeight?: string | number;
  tooltip?: string;
  items?: Item[];
}

const HeadingButton = (props: Props) => {
  const active = useMemo(() => {
    const find: any = props?.items?.find((k: any) => k.isActive());

    if (find && !find.default) {
      return {
        ...find,
      };
    }
    const item: Item = {
      title: props.tooltip as any,
      level: 0,
      isActive: () => false,
    };
    return item;
  }, [props]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={props?.disabled}>
        <ActionMenuButton
          title={active?.title}
          tooltip={props?.tooltip}
          disabled={props?.disabled}
          icon='MenuDown'
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-full'>
        {props?.items?.map((item: any, index) => {
          return (
            <Fragment key={index}>
              <DropdownMenuCheckboxItem
                checked={active?.title === item.title}
                onClick={item.action}
              >
                <div className={`ml-1 h-full heading-${item.level}`}>{item.title}</div>
                {!!item?.shortcutKeys?.length && (
                  <DropdownMenuShortcut className='pl-4'>
                    {item?.shortcutKeys?.map((item: any) => getShortcutKey(item)).join(' ')}
                  </DropdownMenuShortcut>
                )}
              </DropdownMenuCheckboxItem>
              {item.level === 0 && <DropdownMenuSeparator />}
            </Fragment>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeadingButton;
