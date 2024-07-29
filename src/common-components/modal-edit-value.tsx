import * as React from "react";
import { Box, Button, Grid, IconButton, Typography, TextField } from "@mui/material";
import { ReactComponent as CancelIcon } from "../common-components/cancel-icon.svg";
import { useEffect, useState } from "react";
import { ActionType } from "../admin-view/sub-components/lease-details-table";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

interface ReusableModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (action: ActionType, textfieldsVal: { [id: string]: string }) => void;
  action: ActionType;
  titleText: string;
  headers: string[];
  editData: any; 
}

const ReusableModal: React.FC<ReusableModalProps> = ({
  open,
  onClose,
  onConfirm,
  action,
  titleText,
  headers,
  editData,
}) => {
  const [confirmBtnEnabled, setConfirmBtnEnabled] = useState<boolean>(false);
  const [textFields, setTextFields] = useState<{ [id: string]: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // const [isEmailBlurred, setIsEmailBlurred] = useState<boolean>(false); // why was this left here? we're not even using this state

  const allValuesPresent = Object.values(textFields).every((val) => val !== '');

  const handleValueChange = (id: string, value: string) => {
    setTextFields((prevTextFields) => ({ ...prevTextFields, [id]: value }));

    if (id !== 'EMAIL') {
      setConfirmBtnEnabled(
        allValuesPresent &&
        (!textFields['EMAIL'] || emailRegex.test(textFields['EMAIL']))
      );
    }
  };

  const handleEmailBlur = () => {
    if (!emailRegex.test(textFields['EMAIL'] || '')) {
      toast.error('Invalid email format');
    }
    // setIsEmailBlurred(true);
    setConfirmBtnEnabled(
      allValuesPresent &&
      emailRegex.test(textFields['EMAIL'] || '')
    );
  };

  useEffect(() => {
    if (!open) {
      setTextFields({});
      setConfirmBtnEnabled(false);
      // setIsEmailBlurred(false);
    } else if (editData) {
      const initialTextFields = headers.reduce((acc: any, heading, index) => {
        acc[heading] = (([Object.values(editData)])[0])[index];
        return acc;
      }, {});
      setTextFields(initialTextFields);
    }
  }, [open, editData, headers]);

  const handleOnConfirm = async () => {
    setIsLoading(true); 

    try {
      await onConfirm(action, textFields);
      toast.success('Action completed successfully');
    } catch (error) {
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: open ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "890px",
            backgroundColor: "#FFFFFF",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
            borderRadius: "6px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: "6px 6px 0 0",
              backgroundColor: "#4CAF50",
              p: 2,
            }}
          >
            <Typography
              variant="h6"
              fontSize="18px"
              color="white"
              fontWeight="bold"
              align="center"
              sx={{ flexGrow: 1, textAlign: "center" }}
            >
              {titleText}
            </Typography>
            <IconButton aria-label="cancel" onClick={() => onClose()} sx={{ color: "white" }}>
              <CancelIcon />
            </IconButton>
          </Box>

          {headers.map((heading: string, index: number) => (
            <Box mt={2} paddingLeft={2} key={`${index}-${heading}`}>
              <Grid container spacing={2}>
                <Grid item alignContent={'flex-end'} xs={5} sx={{ backgroundColor: "#F7F9FB", border: '1px solid #0000001A', p: 3 }}>
                  <Typography variant="subtitle1" style={{ textAlign: "left", paddingLeft: "24px", color: "#3F639BE6" }}>{heading}</Typography>
                </Grid>
                <Grid item xs={7} sx={{ border: '1px solid #0000001A', p: 3 }}>
                  <Grid sx={{ paddingLeft: '24px' }}>
                    <TextField
                      fullWidth
                      value={textFields[heading]}
                      onChange={(e) => handleValueChange(heading, e.target.value)}
                      onBlur={heading === 'EMAIL' ? handleEmailBlur : undefined}
                      variant="standard"
                      key={`${index}-${heading.toLowerCase()}`}
                      id={`${index}-${heading.toLowerCase()}`}
                      multiline
                      maxRows={3}
                      InputProps={{
                        readOnly: !!!index && action === ActionType.Edit,
                        disableUnderline: true,
                        sx: {
                          "&:hover": {
                            borderBottom: !!!index && action === ActionType.Edit ? `1.5px solid white` : `1.5px solid #1976D2`,
                          },
                          "&:focus": {
                            borderBottom: !!!index && action === ActionType.Edit ? `1.5px solid white` : `1.5px solid #1976D2`,
                          },
                          borderBottom: `1.5px solid white`,
                          maxWidth: "calc(100% - 24px)",
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          ))}
          <Box mt={3} display="flex" justifyContent="center" gap={2} p={1}>
            <Button
              onClick={handleOnConfirm}
              variant="contained"
              color="primary"
              disabled={!confirmBtnEnabled || isLoading}
              sx={{ marginBottom: '16px' }}
            >
              {isLoading ? 'Processing...' : 'Confirm'}
            </Button>
          </Box>
        </Box>
      </Box>
      <ToastContainer />
    </>
  );
};

export default ReusableModal;
