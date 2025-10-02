import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";

// Data Structure for provider and models
type ModelData = {
  OpenAI: string[];
  Anthropic: string[];
  Google: string[];
  Meta: string[];
};

type ModelProvider = keyof ModelData;

const Model_data: Record<ModelProvider, string[]> = {
  OpenAI: ['GPT-4', 'GPT-5'],
  Anthropic: ['Sonnet 4', 'Sonnet 5'],
  Google: ['Gemini pro', 'Gemini lite'],
  Meta: ['Llama 3', 'Llama 4'],
};

// language dropdowns
const LANGUAGES = [
  { label: 'English', value: 'en' },
  { label: 'Spanish', value: 'es' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Italian', value: 'it' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Chinese', value: 'zh' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Korean', value: 'ko' },
  { label: 'Arabic', value: 'ar' },
  { label: 'Hindi', value: 'hi' },
  { label: 'Russian', value: 'ru' },
];


export default function HomeScreen() {
  // state for provider and model
  const [selectedProvider, setSelectedProvider] = useState<ModelProvider>('OpenAI');
  const [selectedModel, setSelectedModel] = useState('GPT-4');

  // state for text input
  const [inputText, setInputText] = useState('');

  // state for languages
  const [inputLanguage, setInputLanguage] = useState('en');
  const [outputLanguage, setOutputLanguage] = useState('hi');

  // state for toggle button
  const [inputMode, setInputMode] = useState('text');

  //handle provider change - reset model to first option
  const handleProviderChange = (provider: ModelProvider) => {
    setSelectedProvider(provider);
    setSelectedModel(Model_data[provider][0])
  };

  // handle for langauge
  const handleSwapLanguages = () => {
    const temp = inputLanguage;
    setInputLanguage(outputLanguage);
    setOutputLanguage(temp);
  };

  // handle for input mode toggle
  const handleToggleInputMode = () => {
    setInputMode(inputMode === 'text' ? 'voice' : 'text');
  };

  // handle for submit button
  const handleSubmit = () => {
  if (inputText.trim().length === 0) return;
  
  // For now, just log the data (will connect to API later)
  console.log('Translation Request:', {
    provider: selectedProvider,
    model: selectedModel,
    text: inputText,
    from: inputLanguage,
    to: outputLanguage,
  });
  
  // TODO: Add translation API call here
  alert('Translation started!\n\nThis will be connected to the API in the next phase.');
};

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Voice Translation</Text>

      {/* Provider DropDown */}
      <View style={styles.dropdownSection}>
        <Text style={styles.label}>Select Provider</Text>
        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={selectedProvider}
            onValueChange={handleProviderChange}
            style={styles.dropdown}
            dropdownIconColor='white'
            >
            {Object.keys(Model_data).map((provider) => (
              <Picker.Item key={provider} label={provider} value={provider} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Model DropDown */}
      <View style={styles.dropdownSection}>
        <Text style={styles.label}>Select Model</Text>
        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={selectedModel}
            onValueChange={(itemValue) => setSelectedModel(itemValue)}
            style={styles.dropdown}
            dropdownIconColor='white'
            >
            {Model_data[selectedProvider].map((model) => (
              <Picker.Item key={model} label={model} value={model} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Input text toggle */}
      <View style={styles.toggleSection}>
        <Text style={styles.label}>Input Method</Text>
        <View style={styles.toggleContainer}>
          <TouchableOpacity 
            style={[
              styles.toggleButton,
              inputMode === "text" && styles.toggleButtonActive
            ]}
            onPress={() => setInputMode("text")}
          >
            <Text style={[
              styles.toggleButtonText,
              inputMode === "text" && styles.toggleButtonTextActive
            ]}>
              📝 Text
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.toggleButton,
              inputMode === "voice" && styles.toggleButtonActive
            ]}
            onPress={() => setInputMode("voice")}
          >
            <Text style={[
              styles.toggleButtonText,
              inputMode === "voice" && styles.toggleButtonTextActive
            ]}>
              🎤 Voice
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* conditional input display */}
      {inputMode === 'text' ? (
        <View style={styles.inputSection}>
          <View style={styles.inputHeader}>
            <Text style={styles.label}>Input Text</Text>
            <Text style={styles.charCount}>{inputText.length} Characters</Text>
          </View>

          <TextInput
            style={styles.textArea}
            placeholder='Enter text to translate...'
            placeholderTextColor='#555'
            value={inputText}
            onChangeText={setInputText}
            textAlignVertical='top'
            multiline={true}
            numberOfLines={6} 
            />
          {inputText.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => setInputText('')} >
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={styles.voiceSection}>
          <View style={styles.voiceIconContainer}>
            <Text style={styles.voiceIcon}>🎤</Text>
          </View>
          <Text style={styles.voiceText}>Voice Input Method</Text>
          {/* <Text style={styles.voceSubText}>Tap the button to start recording</Text> */}
          <TouchableOpacity style={styles.recordButton}>
            <Text style={styles.recordButtonText}> Start Recording</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Language Selection */}
      <View style={styles.languageSection}>
        <Text style={styles.label}>Translation Languages</Text>
        
        <View style={styles.languageRow}>
          {/* Input Language */}
          <View style={styles.languageDropdown}>
            <Text style={styles.languageSubLabel}>From</Text>
            <View style={styles.dropdownContainer}>
              <Picker
                selectedValue={inputLanguage}
                onValueChange={(itemValue) => setInputLanguage(itemValue)}
                style={styles.dropdown}
                dropdownIconColor='white'
              >
                {LANGUAGES.map((lang) => (
                  <Picker.Item key={lang.value} label={lang.label} value={lang.value} />
                ))}
              </Picker>
            </View>
          </View>

          {/* Swap Button */}
          <TouchableOpacity 
            style={styles.swapButton}
            onPress={handleSwapLanguages}
          >
            <Text style={styles.swapIcon}>⇄</Text>
          </TouchableOpacity>

          {/* Output Language */}
          <View style={styles.languageDropdown}>
            <Text style={styles.languageSubLabel}>To</Text>
            <View style={styles.dropdownContainer}>
              <Picker
                selectedValue={outputLanguage}
                onValueChange={(itemValue) => setOutputLanguage(itemValue)}
                style={styles.dropdown}
                dropdownIconColor='white'
              >
                {LANGUAGES.map((lang) => (
                  <Picker.Item key={lang.value} label={lang.label} value={lang.value} />
                ))}
              </Picker>
            </View>
          </View>
        </View>
      </View>

      {/* Submit Button */}
      <TouchableOpacity 
        style={[
          styles.submitButton,
          (inputMode === "text" && inputText.trim().length === 0) && styles.submitButtonDisabled
        ]}
        onPress={handleSubmit}
        disabled={inputMode === "text" && inputText.trim().length === 0}
        activeOpacity={0.8}
      >
        <Text style={styles.submitButtonText}>
          {inputMode === "text" ? "Translate Now" : "Translate Voice"}
        </Text>
      </TouchableOpacity>

      {/* Selecetd Info Display
      <View style={styles.selectionInfo}>
        <Text style={styles.selectedText}>Provider : {selectedProvider}</Text>
        <Text style={styles.selectedText}>Model : {selectedModel}</Text>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 15,
    backgroundColor: '#000',
    paddingHorizontal: 20,
  },

  heading: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 30,
  },

  label: {
    color: '#888',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '600',
  },

  dropdownSection: {
    width: '100%',
    marginBottom: 20,
  },

  dropdown: {
    color: 'black',
    width: '100%',
    height: '100%',
    fontSize: 14,
  },

  dropdownContainer: {
    borderWidth: 0.8,
    borderColor: '#555',
    borderRadius: 8,
    width: '100%',
    height: 50,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
  },

  selectionInfo: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    width: '100%',
    borderWidth: 0.8,
    borderColor: '#555',
  },

  selectedText: {
    color: 'white',
    fontSize: 16,
    marginVertical: 2,
  },

  // input section
  inputSection: {
    width: '100%',
    marginBottom: 20,
  },

  inputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  charCount: {
    color: '#666',
    fontSize: 12,
  },

  textArea: {
    backgroundColor: '#1a1a1a',
    borderWidth: 0.8,
    borderColor: '#555',
    borderRadius: 8,
    color: 'white',
    padding: 12,
    fontSize: 16,
    minHeight: 120,
    maxHeight: 200
  },

  clearButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
    backgroundColor: '#333',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6
  },

  clearButtonText: {
    color: '#ff6b6b',
    fontSize: 14,
    fontWeight: '600'
  },

  // language section
  languageSection: {
  width: '100%',
  marginBottom: 20,
  },

  languageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
  },

  languageDropdown: {
    flex: 1,
  },

  languageSubLabel: {
    color: '#666',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
  },

  swapButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    backgroundColor: '#2a2a2a',
    borderRadius: 25,
    borderWidth: 0.8,
    borderColor: '#555',
    marginBottom: 0,
  },
  
  swapIcon: {
    color: '#4a9eff',
    fontSize: 24,
    fontWeight: 'bold',
  },

  // toggle section
  toggleSection: {
  width: '100%',
  marginBottom: 20,
  alignItems: 'center',
  },

  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 4,
    borderWidth: 0.8,
    borderColor: '#555',
    width: '20%'
  },

  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },

  toggleButtonActive: {
    backgroundColor: '#4a9eff',
  },

  toggleButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },

  toggleButtonTextActive: {
    color: 'white',
  },

  voiceSection: {
    width: '100%',
    backgroundColor: '#1a1a1a',
    borderWidth: 0.8,
    borderColor: '#555',
    borderRadius: 8,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
    minHeight: 200,
    justifyContent: 'center',
  },

  voiceIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#4a9eff',
  },

  voiceIcon: {
    fontSize: 40,
  },

  voiceText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },

  voiceSubText: {
    color: '#',
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },

  recordButton: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },

  recordButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  //Submit button
  submitButton: {
  width: '100%',
  backgroundColor: '#4a9eff',
  paddingVertical: 16,
  borderRadius: 10,
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 20,
  shadowColor: '#4a9eff',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 5,
  },

  submitButtonDisabled: {
    backgroundColor: '#333',
    shadowOpacity: 0,
    elevation: 0,
  },

  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});