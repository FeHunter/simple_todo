import colors from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { ComponentProps, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { ButtonFilter } from "../components/button_filter";

// data
import filtersOptions from '../data/filters_options.json';
// Model
import { FiltersOptions } from "../model/filters_options_model";
// ViewModel
import { useTaskFiltersViewModel } from "../view_models/filters_view_model";

type ITaskFilters = {
   
}

export function TaskFilters ( taskfilter : ITaskFilters ) {

    const view_model = useTaskFiltersViewModel()
    const filters = filtersOptions

    const [modalView, setModalView] = useState(false)
    const activedFilters = view_model.activedFilters

    const handleModalView = () => {
        setModalView(!modalView)
    }

    const handleAddFilter = (itemId: string) => {
        view_model.AddFilterToggle(itemId)
    }

    return (
        <View style={{
        }}>

            <Pressable
                style={{
                    justifyContent: 'center', alignItems: 'center',
                    padding: 1,
                }}
                onPress={handleModalView}
            >
                <Ionicons
                    name="funnel-sharp"
                    size={35}
                    color={colors.segundary}
                />
            </Pressable>

            {/* Modal Filters Options */}
            { modalView &&
                <View style={{
                    position: 'fixed',
                    alignItems: 'center',
                    top: '10%', left: '2.5%',
                    width: '95%', height: '80%',
                    backgroundColor: colors.main,
                }}>

                    {/* Modal header */}
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingLeft: 10, paddingRight: 10,
                        marginBottom: 20,
                        width: '100%',
                    }}>

                        <Text style={{
                            textAlign: 'center',
                            margin: 10,
                            fontSize: 22,
                            color: colors.textWhite
                        }}>Apply filters</Text>

                        <Pressable
                            onPress={handleModalView}
                        >
                            <Ionicons
                                name="close-circle"
                                size={35}
                                color={colors.segundary}
                            />
                        </Pressable>

                    </View>

                    {/* Modal Body */}
                    <View style={{
                        width: '90%',
                        gap: 10,
                    }}>
                        <FlatList
                            data={filters}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item }: { item: FiltersOptions }) => (
                                 <ButtonFilter
                                    id={item.id}
                                    label={item.label}
                                    iconType={item.icon as ComponentProps<typeof Ionicons>["name"]}
                                    actived={activedFilters.includes(item.id)}
                                    onPress={()=>{ handleAddFilter(item.id) }}
                                />
                            )}
                        />
                    </View> 

                </View>
            }

        </View>
    )
}