import colors from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { ButtonFilter } from "../components/button_filter";

type ITaskFilters = {
    modalView: boolean,
    toggleModal: ()=>void
}

export function TaskFilters ( taskfilter : ITaskFilters ) {

    const [modalView, setModalView] = useState(taskfilter.modalView)

    useEffect(()=>{
        setModalView(taskfilter.modalView)
    },[taskfilter.modalView])

    const handleModalView = () => {
        setModalView(!modalView)
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
                    name="settings"
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

                        <ButtonFilter
                            label={'Completed tasks'}
                            iconType={"checkmark-done"}
                            onPress={()=>{  }}
                        />

                        <ButtonFilter
                            label={'recently added'}
                            iconType={"calendar-clear"}
                            onPress={()=>{  }}
                        />

                    </View> 

                </View>
            }

        </View>
    )
}