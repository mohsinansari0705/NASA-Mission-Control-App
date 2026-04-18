import React, { memo, useCallback } from 'react';
import {
  View,
  Text,
  Alert,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { Launch } from '@/common/types/types';
import { useTheme } from '@/theme/ThemeContext';
import { useSoundEffect } from '@/common/sound/useSound';

type Column = {
  key: string;
  title: string;
  flex?: number;
};
type TableComponentProps = {
  type: 'upcoming' | 'history';
  data: Launch[];
  columns: Column[];
  onAbort?: (launchId: string) => void;
};

export const TableComponent = ({ type, data, columns, onAbort }: TableComponentProps) => {
  const theme = useTheme();
  const playClick = useSoundEffect('click');

  const formatDate = (v: any) => {
    const d = v instanceof Date ? v : new Date(v);

    if (isNaN(d.getTime())) return String(v);
    const parts = new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(d);

    return parts.replace(/^([A-Za-z]{3}),\s*/, '$1 ');
  };

  const renderCell = useCallback((col: Column, item: any) => {
    if (col.key === 'abortButton') return '✖';
    if (col.key === 'status') return '■';

    const value = item[col.key];
    
    if (value === undefined || value === null) return '';
    if (col.key === 'launchDate') return formatDate(value);
    if (col.key === 'customers') return value.join(', ');

    return String(value);
  }, []);

  const renderRow = useCallback(
    ({ item }: { item: Launch }) => {
      if (type === 'upcoming' && item.upcoming === false) return null;
      
      return (
        <TouchableOpacity
          onPress={playClick}
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: theme.space.md * 0.9,
            borderBottomWidth: 1.75,
            borderColor: theme.colors.outline,
          }}
        >
          {columns.map((col) => {
            if (col.key === 'abortButton') {
              return (
                <TouchableOpacity
                  key={col.key}
                  accessibilityLabel='Abort mission'
                  accessibilityRole='button'
                  onPress={() => {
                    onAbort && onAbort(item.flightNumber);
                    // Alert.alert('Abort mission', 'Are you sure you want to abort?', [
                    //     { text: 'Cancel', style: 'cancel' },
                    //     { text: 'Abort', style: 'destructive', onPress: () => onAbort && onAbort(item.flightNumber) },
                    //   ]
                    // );
                  }}
                  style={{
                    flex: col.flex || 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: theme.space.sm,
                  }}
                >
                  <Text
                    style={{ color: theme.colors.danger, fontFamily: theme.fonts.ubuntu, fontSize: theme.fontSize.xl }}
                  >
                    {renderCell(col, item)}
                  </Text>
                </TouchableOpacity>
              );
            }

            if (col.key === 'status') {
              const status = item.success;

              return (
                <View
                  key={col.key}
                  style={{
                    flex: col.flex || 1,
                    justifyContent: 'center',
                    paddingHorizontal: theme.space.sm,
                  }}
                >
                  <Text
                    style={{ color: status ? theme.colors.success : theme.colors.danger, fontSize: theme.fontSize.sm }}
                  >
                    {renderCell(col, item)}
                  </Text>
                </View>
              );
            }

            return (
              <View
                key={col.key}
                style={{
                  flex: col.flex || 1,
                  justifyContent: 'center',
                  paddingHorizontal: theme.space.sm,
                }}
              >
                <Text
                  style={{ color: theme.colors.bodyText, fontFamily: theme.fonts.ubuntu }}
                  numberOfLines={2}
                >
                  {renderCell(col, item)}
                </Text>
              </View>
            );
          })}
        </TouchableOpacity>
      );
    },
    [columns, onAbort, theme]
  );

  const Header = (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: theme.colors.panelBorder,
        paddingVertical: theme.space.sm,
      }}
    >
      {columns.map((col) => (
        <View
          key={col.key}
          style={{
            justifyContent: 'center',
            paddingHorizontal: theme.space.sm,
            flex: col.flex || 1,
          }}
        >
          <Text
            style={{
              color: theme.colors.heading,
              fontSize: theme.fontSize.md * 1.1,
              fontFamily: theme.fonts.sairaStencil,
            }}
            numberOfLines={1}
          >
            {col.title}
          </Text>
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView horizontal contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ minWidth: '100%' }}>
        {Header}

        <FlatList
          data={data}
          keyExtractor={(item) => item.flightNumber.toString()}
          renderItem={(row) => renderRow(row)}
          removeClippedSubviews={true}
          initialNumToRender={15}
          maxToRenderPerBatch={20}
        />
      </View>
    </ScrollView>
  );
};

// // Ensure correct generic typing for the memoized component in TS
// export const TableComponent = memo(TableInner) as unknown as <T>(
//   props: Props<T>
// ) => React.JSX.Element;
