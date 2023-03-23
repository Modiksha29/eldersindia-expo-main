import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { MotiScrollView, MotiView, ScrollView } from 'moti'
import { Layout, Button, Icon, Text, Input, List, Card, IconProps, IconElement, useTheme, Divider } from '@ui-kitten/components'
import { ImageProps } from 'react-native'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { SheetManager } from 'react-native-actions-sheet'
import { useQuery, } from '@tanstack/react-query'
import getBranch from 'apis/corporate/branches'

const branches = [
    { location: 'Bengaluru', contact_person: 'Krishna', contact_number: '+91 1234567890', email: 'krishna@elderswealth.com', designation: 'Senior HR', is_headquarter: true },
    { location: 'Delhi', contact_person: 'Avishek', contact_number: '+91 1234567890', email: 'avishek@elderswealth.com', designation: 'HR Manager', is_headquarter: false },
    { location: 'Mumbai', contact_person: 'Manikanta', contact_number: '+91 1234567890', email: 'manikanata@elderswealth.com', designation: 'Senior HR', is_headquarter: false },
    { location: 'Chennai', contact_person: 'Ajay', contact_number: '+91 1234567890', email: 'ajay@elderswealth.com', designation: 'Senior HR', is_headquarter: false },
];

const TagsIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='pricetags-outline' width={32} heigth={32} />
const ShareIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='share-outline' width={32} heigth={32} />
const BookmarkIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='bookmark-outline' width={32} heigth={32} />
const SearchIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='search-outline' width={32} heigth={32} />
const CloseIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='close-circle-outline' width={32} heigth={32} />
const RetryIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='refresh-outline' width={32} heigth={32} />
const DeleteIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='trash' width={32} heigth={32} />
const SelectAllIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='checkmark-square-2-outline' width={32} heigth={32} />
const RemoveSelection = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='close-square-outline' width={32} heigth={32} />

export default function Page() {
    const theme = useTheme()
    const [search, setSearch] = useState('')
    const { push, replace, back } = useRouter()
    const [selectedCount, setSelectedCount] = useState(0);
    const [branchdata, setBranchData] = useState(branches)
    const [selectedItems, setSelectedItems] = useState([]);
    const [sort = 'location-asc', setSort] = useState();
    const fetchBlogs = (page = 1, sort, search) => getBranch(page, sort, search)
    const [page = 1, setPage] = useState();

    const {
        isSuccess,
        isLoading,
        isError,
        error,
        data: branch,
        isFetching,
        refetch
    } = useQuery({
        enabled: false,
        queryKey: ['branch', page, sort, search],
        queryFn: () => fetchBlogs(page, sort, search),
        onSuccess(data) {
            console.log('Called')
            let list = []
            data.data?.data?.data?.map((l, i) => {
                console.log('inside')
                list.push({
                    id: l.id,
                    title: l.title,
                    content: l.content,
                    image: l.image,
                    link: `/corporate/branch/${l.title['en']}?id=${l.id}&name=${l.title['en']}`,
                })
            })
            list.length > 0 && setBranchData(branchdata.concat(list));
        },
    })

    const handelSection = (id, isSelected) => {
        isSelected ? setSelectedCount(old => old - 1) : setSelectedCount(old => old + 1)
        setBranchData(branchdata => branchdata.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    isSelected: !item.isSelected,
                }
            }
            return item
        }))
    };
    const onDelete = () => {
        setBranchData(branchdata => branchdata.filter(item => !item.isSelected));
        setSelectedCount(0);
        console.log(setSelectedItems)
        console.log('checkbox item deleted')
    };
    const handleSelectAll = () => {
        setSelectedCount(branchdata.length);
        setBranchData(branchdata => branchdata.map(item => ({
            ...item,
            isSelected: true,
        })));
    };
    const handleRemoveSelection = () => {
        setSelectedCount(0);
        setBranchData(branchdata => branchdata.map(item => ({
            ...item,
            isSelected: false,
        })));
    };
    //const keyExtractor = React.useCallback((item) => item.id.toString(), []);
    const openSortSheet = async () => {
        const sortType = await SheetManager.show('locations-sort-sheet', { payload: sort })
        if (sortType !== undefined) {
            setSort(sortType)
            // list?.current.scrollToIndex({ animated: true, index: 0 })
        }
    }
    const debounce = (func) => {
        let timer;
        return function (...args) {
            const context = this;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                func.apply(context, args);
            }, 700);
        };
    };

    const handleSearch = (value) => {
        setSearch(value)
    }

    const optimizedFn = React.useCallback(debounce(handleSearch), []);
    const renderItem = ({ item, index }) => (
        <ScrollView>
            <Card onPress={() => push(`/corporate/branches/${item.id}/${item.name}`)}>
                <MotiView style={{ marginVertical: 8, flexDirection: 'row', alignItems: 'center' }}>
                    <Icon
                        style={{ width: 32, height: 32, marginRight: 8, tintColor: item.is_headquarter ? theme['color-primary-default'] : theme['color-basic-800'] }}
                        fill={theme['color-basic-800']}
                        name={'ios-location-outline'}
                        pack={'ionicons'}
                    />
                    <Text category='h6' status={`${item.is_headquarter ? 'primary' : 'basic'}`}>{`${item?.location} ${item.is_headquarter ? '(Headquarters)' : ''}`}</Text>
                </MotiView>
                <Divider />
                <MotiView style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginVertical: 8 }}>
                    <MotiView style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-start' }}>
                        <Icon
                            style={{ width: 24, height: 24, marginRight: 8, tintColor: theme['color-basic-800'] }}
                            fill={theme['color-basic-800']}
                            name={'ios-person-outline'}
                            pack={'ionicons'}
                        />
                        <Text category='p1'>{item?.contact_person}</Text>
                    </MotiView>
                    <MotiView style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Icon
                            style={{ width: 24, height: 24, marginRight: 8, tintColor: theme['color-basic-800'] }}
                            fill={theme['color-basic-800']}
                            name={'ios-call-outline'}
                            pack={'ionicons'}
                        />
                        <Text category='p1'>{item?.contact_number}</Text>
                    </MotiView>
                </MotiView>
                <MotiView style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginVertical: 4 }}>
                    <MotiView style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Icon
                            style={{ width: 24, height: 24, marginRight: 8, tintColor: theme['color-basic-800'] }}
                            fill={theme['color-basic-800']}
                            name={'ios-mail-outline'}
                            pack={'ionicons'}
                        />
                        <Text category='p1'>{item?.email}</Text>
                    </MotiView>
                    <MotiView style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Icon
                            style={{ width: 24, height: 24, marginRight: 8, tintColor: theme['color-basic-800'] }}
                            fill={theme['color-basic-800']}
                            name={'ios-information-outline'}
                            pack={'ionicons'}
                        />
                        <Text>{item?.designation}</Text>
                    </MotiView>
                </MotiView>
            </Card>
        </ScrollView>
    );


    return (
        // <Layout level='2' style={{ flex: 1 }}>
        //   <MotiView
        //     from={{ opacity: 0 }}
        //     animate={{ opacity: 1 }}
        //     transition={{ type: 'timing' }}
        //   >
        //     <MotiView
        //       style={{ flexDirection: 'row', backgroundColor:theme['color-basic-100'] }}
        //       from={{
        //         opacity: 0,
        //         scale: 0.5,
        //       }}
        //       animate={{
        //         opacity: 1,
        //         scale: 1,
        //       }}
        //       transition={{
        //         type: 'timing',
        //       }}
        //     >
        //       <Button status='primary' appearance='ghost' style={{ flex: 1 }} accessoryLeft={(props: IconProps): IconElement<ImageProps> => <Icon {...props} style={[props.style, { tintColor: theme['color-primary-default'] }]} name='ios-swap-vertical-outline' pack='ionicons'
        //       />}
        //       // onPress={openSortSheet}
        //       >Sort</Button>
        //       <Button status='basic' appearance='ghost' style={{ flex: 1 }} accessoryLeft={(props: IconProps): IconElement<ImageProps> => <Icon {...props} style={[props.style, { tintColor: theme['color-basic-600'] }]} name='ios-filter-outline' pack='ionicons'
        //       />}>Filter</Button>
        //     </MotiView>
        //     <Input value={search} onChangeText={nextValue => setSearch(nextValue)} size='medium' placeholder='Search branches' accessoryRight={<SearchIcon color={theme['color-primary-default']} />} style={{padding: 4, backgroundColor: theme['color-basic-100']}} />
        //     {/* <Text category='h4' style={{textAlign: 'center', marginVertical: 4}}>Manage Branches</Text> */}
        //     <List
        //       data={branches}
        //       renderItem={renderItem}
        //     />
        //   </MotiView>

        // </Layout>
        <Layout>
            {/* ---If Selected ? Action Button Section : Show Sort, Filter and Search Section------------------------ */}
            {selectedCount > 0
                ?
                <MotiView style={{ flexDirection: 'row', alignSelf: "flex-end" }} >
                    {selectedCount > 0 && (
                        <Button onPress={onDelete}
                            status="primary"
                            appearance="ghost"
                            style={{ width: 20 }}
                            accessoryLeft={<DeleteIcon color={theme['color-basic-700']} />} />
                    )}

                    {selectedCount > 0 && (
                        <Button onPress={handleSelectAll} status='primary'
                            appearance="ghost"
                            style={{ width: 20 }}
                            accessoryLeft={<SelectAllIcon color={theme['color-basic-700']} />} />
                    )}

                    {selectedCount > 0 && (
                        <Button onPress={handleRemoveSelection}
                            appearance="ghost" status='primary'
                            style={{ width: 20 }}
                            accessoryLeft={<RemoveSelection color={theme['color-basic-700']} />} />
                    )}

                </MotiView>
                :
                <MotiView>
                    {/* Sort and Filter section */}
                    <MotiView
                        style={{ flexDirection: 'row' }}
                        from={{
                            opacity: 0,
                            scale: 0.5,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                        transition={{
                            type: 'timing',
                        }}
                    >
                        <Button status='primary' appearance='ghost' style={{ flex: 1 }} accessoryLeft={(props: IconProps): IconElement<ImageProps> => <Icon {...props} style={[props.style, { tintColor: theme['color-primary-default'] }]} name='ios-swap-vertical-outline' pack='ionicons'
                        />}
                            onPress={openSortSheet}
                        >Sort</Button>
                        <Button status='warning' appearance='ghost' style={{ flex: 1 }} accessoryLeft={(props: IconProps): IconElement<ImageProps> => <Icon {...props} style={[props.style, { tintColor: theme['color-warning-default'] }]} name='ios-filter-outline' pack='ionicons'
                        />}>Filter</Button>

                    </MotiView>

                    <Divider />

                    {/* Search Section */}

                    <Input size='medium' placeholder='Search your branch' onChangeText={nextValue => optimizedFn(nextValue)} accessoryRight={search !== "" ? <CloseIcon color={theme['color-danger-default']} onPress={() => optimizedFn("")} /> : <SearchIcon color={theme['color-primary-default']} />} />

                    <Divider />

                </MotiView>

            }
            <List
                data={branches}
                renderItem={renderItem}
            />
        </Layout>
    )
}

