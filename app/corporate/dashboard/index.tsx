import { useState } from 'react'
import { useRouter } from 'expo-router'
import { MotiView, MotiScrollView } from 'moti'
import { Layout, Button, Icon, Text, Input, ViewPager, Card, useTheme, } from '@ui-kitten/components'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import LinearGradient from 'react-native-linear-gradient';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryStack, VictoryAxis } from "victory-native";
let numeral = require('numeral')

const widgets = [
  {
    icon: 'ios-git-branch-outline',
    iconPack: 'ionicons',
    title: 'Branches',
    count: 4,
    link: '/corporate/branches',
  },
  {
    icon: 'ios-people-outline',
    iconPack: 'ionicons',
    title: 'Employees',
    count: 3269,
    link: '/corporate/employees',
  },
  {
    icon: 'elderly',
    iconPack: 'material',
    title: 'Elders',
    count: 5467,
  },
  {
    icon: 'ios-list-outline',
    iconPack: 'ionicons',
    title: 'Bookings',
    count: 8568,
  },
]

const myDataset = [
  [
    { x: "a", y: 1 },
    { x: "b", y: 2 },
    { x: "c", y: 3 },
    { x: "d", y: 2 },
    { x: "e", y: 1 }
  ],
  [
    { x: "a", y: 2 },
    { x: "b", y: 3 },
    { x: "c", y: 4 },
    { x: "d", y: 5 },
    { x: "e", y: 5 }
  ],
  [
    { x: "a", y: 1 },
    { x: "b", y: 2 },
    { x: "c", y: 3 },
    { x: "d", y: 4 },
    { x: "e", y: 4 }
  ],
  [
    { x: "a", y: 1 },
    { x: "b", y: 2 },
    { x: "c", y: 3 },
    { x: "d", y: 4 },
    { x: "e", y: 4 }
  ]
];

function transformData(dataset) {
  const totals = dataset[0].map((data, i) => {
    return dataset.reduce((memo, curr) => {
      return memo + curr[i].y;
    }, 0);
  });
  return dataset.map((data) => {
    return data.map((datum, i) => {
      return { x: datum.x, y: (datum.y / totals[i]) * 100 };
    });
  });
}

export default function Page() {
  const { push, replace, back } = useRouter()
  const [pageIndex, setPageIndex] = useState(0)
  const theme = useTheme();

  const dataset = transformData(myDataset);
  return (
    <Layout level='2' style={{ flex: 1, padding: 8 }}>
      <MotiScrollView>
        <MotiView style={{ padding: 8 }}>
          <Text category='s1'>Welcome, Krishna</Text>
        </MotiView>
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing' }}
          style={{ flexWrap: 'wrap', flexDirection: 'row' }}
        >
          {widgets.map((w, i) => (
            <Card key={w.title + i} style={{ marginVertical: 8, marginHorizontal: 8, width: 180 }} onPress={() => w?.link && push(w?.link)}>
              <MotiView style={{ flexDirection: 'row' }}>
                <Icon
                  style={{ width: 48, height: 48, tintColor: theme['color-primary-500'] }}
                  fill={theme['color-primary-500']}
                  name={w.icon}
                  pack={w.iconPack}
                />
                <MotiView style={{ alignContent: 'center', marginLeft: 8 }}>
                  <Text category='h4'>{numeral(w.count).format('0,0.0a')}</Text>
                  <Text category='c1'>{w.title}</Text>
                </MotiView>
              </MotiView>
            </Card>
          ))}

        </MotiView>
        <MotiView style={{}}>
          <Text category='label' style={{ padding: 8 }}>Upcoming events</Text>
          <ViewPager
            selectedIndex={pageIndex}
            onSelect={index => setPageIndex(index)}
          >
            <Card>
              <MotiView style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Icon
                  style={{ width: 48, height: 48, marginRight: 16, tintColor: theme['color-warning-500'] }}
                  fill={theme['color-warning-500']}
                  name={'ios-calendar-outline'}
                  pack={'ionicons'}
                />
                <MotiView style={{ flexDirection: 'column', flex: 1 }}>
                  <Text category='s1' style={{ marginBottom: 4 }}>Elders Day Special 2023</Text>
                  <Text category='p2'>Sun, Oct 1, 2023</Text>
                </MotiView>
              </MotiView>
            </Card>
            <Card>
              <MotiView style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Icon
                  style={{ width: 48, height: 48, marginRight: 16, tintColor: theme['color-warning-500'] }}
                  fill={theme['color-warning-500']}
                  name={'ios-calendar-outline'}
                  pack={'ionicons'}
                />
                <MotiView style={{ flexDirection: 'column', flex: 1 }}>
                  <Text category='s1' style={{ marginBottom: 4 }}>Elders Day Special 2023</Text>
                  <Text category='p2'>Sun, Oct 1, 2023</Text>
                </MotiView>
              </MotiView>
            </Card>
          </ViewPager>
          <MotiView style={{
            marginBottom: 8,
            alignSelf: 'center',
          }}>
            <Icon
              style={{ width: 48, height: 48, tintColor: theme['color-basic-600'] }}
              fill={theme['color-basic-600']}
              name={'dots-horizontal'}
              pack={'material-community'}
            />
          </MotiView>
        </MotiView>
        <MotiView style={{ flexDirection: 'row', }}>
          <Card style={{ flex: 1, backgroundColor: theme['color-success-700'], margin: 4 }}>
            <MotiView style={{ alignItems: 'center', justifyContent: 'center', }}>
              <Icon
                style={{ width: 48, height: 48, tintColor: theme['color-basic-100'], marginBottom: 8 }}
                fill={theme['color-basic-100']}
                name={'ios-library-outline'}
                pack={'ionicons'}
              />
              <Text category='s1' appearance='alternative'>Manage Blogs</Text>
            </MotiView>
          </Card>
          <Card style={{ flex: 1, backgroundColor: theme['color-warning-600'], margin: 4 }}>
            <MotiView style={{ alignItems: 'center', justifyContent: 'center', }}>
              <Icon
                style={{ width: 48, height: 48, tintColor: theme['color-basic-100'], marginBottom: 8 }}
                fill={theme['color-basic-100']}
                name={'ios-newspaper-outline'}
                pack={'ionicons'}
              />
              <Text category='s1' appearance='alternative'>Manage News</Text>
            </MotiView>
          </Card>
        </MotiView>
        <MotiView style={{ flexDirection: 'row', }}>
          <Card style={{ flex: 1, backgroundColor: theme['color-info-700'], margin: 4 }}>
            <MotiView style={{ alignItems: 'center', justifyContent: 'center', }}>
              <Icon
                style={{ width: 48, height: 48, tintColor: theme['color-basic-100'], marginBottom: 8 }}
                fill={theme['color-basic-100']}
                name={'ios-calendar-outline'}
                pack={'ionicons'}
              />
              <Text category='s1' appearance='alternative'>Manage Events</Text>
            </MotiView>
          </Card>
          <Card style={{ flex: 1, backgroundColor: theme['color-danger-700'], margin: 4 }}>
            <MotiView style={{ alignItems: 'center', justifyContent: 'center', }}>
              <Icon
                style={{ width: 48, height: 48, tintColor: theme['color-basic-100'], marginBottom: 8 }}
                fill={theme['color-basic-100']}
                name={'ios-layers-outline'}
                pack={'ionicons'}
              />
              <Text category='s1' appearance='alternative'>Manage Shorts</Text>
            </MotiView>
          </Card>
        </MotiView>
        <MotiView>
          <Card>
          <VictoryChart
            domainPadding={{ x: 30, y: 20 }}
          >
            {/* <VictoryStack
            colorScale={["black", "blue", "tomato"]}
          >
            {dataset.map((data, i) => {
              return <VictoryBar data={data} key={i} />;
            })}
          </VictoryStack>
          <VictoryAxis dependentAxis
            tickFormat={(tick) => `${tick}%`}
          />
          <VictoryAxis
            tickFormat={["Healthcare", "b", "c", "d", "e"]}
          /> */}
            <VictoryStack
              colorScale={[theme['color-primary-default'], theme['color-success-default'], theme['color-danger-default'], theme['color-info-default']]}
            >

              <VictoryBar
                data={[{ x: "Sp1", y: 5 }, { x: "b", y: 4 }, { x: "c", y: 6 }]}
              />
              <VictoryBar
                data={[{ x: "Sp1", y: 2 }, { x: "b", y: 3 }, { x: "c", y: 5 }]}
              />

              <VictoryBar
                data={[{ x: "Sp1", y: 3 }, { x: "b", y: 4 }, { x: "c", y: 5 }]}
              />
              <VictoryBar
                data={[{ x: "Sp1", y: 4 }, { x: "b", y: 4 }, { x: "c", y: 5 }]}
              />

              <VictoryBar
                data={[{ x: "Sp1", y: 4 }, { x: "b", y: 4 }, { x: "c", y: 5 }]}
              />
            </VictoryStack>
          </VictoryChart>
          </Card>
        </MotiView>
      </MotiScrollView>
    </Layout>
  )
}
