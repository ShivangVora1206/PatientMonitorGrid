import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { PatientData } from '@shared/schema';

interface PatientState {
  patientData: Record<string, PatientData[]>;
}

const initialState: PatientState = {
  patientData: {}
};

const MAX_DATA_POINTS = 20;

export const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    updatePatientData: (state, action: PayloadAction<PatientData>) => {
      const data = action.payload;
      if (!state.patientData[data.patient_id]) {
        state.patientData[data.patient_id] = [];
      }
      state.patientData[data.patient_id].push(data);
      
      // Keep only last MAX_DATA_POINTS entries
      if (state.patientData[data.patient_id].length > MAX_DATA_POINTS) {
        state.patientData[data.patient_id].shift();
      }
    }
  }
});

export const { updatePatientData } = patientSlice.actions;
export default patientSlice.reducer;
