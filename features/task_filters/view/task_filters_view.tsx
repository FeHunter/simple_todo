import colors from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { ButtonFilter } from "../components/button_filter";

// data
import filtersOptions from '../data/filters_options.json';
// Model
import { FiltersOptions } from "../model/filters_options_model";
// ViewModel
import { router } from "expo-router";
import { useTaskFiltersViewModel } from "../view_models/filters_view_model";


export function TaskFiltersView ( ) {
    
    const filters = filtersOptions
    const view_model = useTaskFiltersViewModel()
    const activedFilters = view_model.activedFilters

    const handleAddFilter = (itemId: string) => {
        view_model.AddFilterToggle(itemId)
    }
    const handleNavigateToTasks = () => {
        router.back()
    }

    return (
        <View style={{
        }}>
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
                        onPress={handleNavigateToTasks}
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
                                actived={activedFilters && activedFilters.includes(item.id) || false}
                                onPress={()=>{ handleAddFilter(item.id) }}
                            />
                        )}
                    />
                </View> 

            </View>
        </View>
    )
}