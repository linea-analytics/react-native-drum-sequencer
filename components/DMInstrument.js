import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Styles from "./Styles";
import DMButton from "./DMButton";
import DMMuteInst from "./DMMuteInst";

function DMInstrument({loop, set_inst_array, inst_style, inst_name, set_set_inst, setSettings, update_volume, inst_volume, loopLen, inst_array}) {

    function open_inst_settings() {
        set_set_inst(inst_name);
        setSettings(prev => !prev);
    };

    const [prevVolume, setPrevVolume] = React.useState(0);
    const [muteStatus, setMuteStatus] = React.useState(false);


    function mute_inst() {
        if (muteStatus) {
            update_volume(prevVolume, inst_name);
            setMuteStatus(false)
        }
        else {
            if (inst_volume !== 0) {
                setPrevVolume(inst_volume);
                update_volume(0, inst_name);
                setMuteStatus(true);
            } else {
                setMuteStatus(true);
            }
        }
    };


    return (
        <View style={Styles.dm_instrument}>
            <Pressable onPress={open_inst_settings} style={Styles.inst_btn}>
                <Text style={Styles.txt}>
                    {inst_name}
                </Text>
            </Pressable>
            <DMMuteInst mute_inst={mute_inst} inst_volume={inst_volume} />
            <View style={Styles.dm_inst_btn_container}>
                {[...Array(loopLen).keys()].reverse().map(
                    id => 
                        <DMButton
                            loop={loop}
                            // modulo = { (id+1)%4 === 0 }
                            loopLen = {loopLen}
                            inst_style={inst_style}
                            set_inst_array={set_inst_array}
                            inst_array={inst_array}
                            array_val={inst_array[id]}
                            id={id}
                            key={id}/>
                )}
            </View>
        </View>
    )

};

export default React.memo(DMInstrument);