import { useState } from 'react';
import { 
  Box, 
  Button, 
  Text, 
  VStack, 
  HStack,
  Flex
} from '@chakra-ui/react';
import { createPortal } from 'react-dom';

interface ConfirmationOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmColorScheme?: string;
}

interface ConfirmationState {
  isOpen: boolean;
  options: ConfirmationOptions | null;
  resolve: ((value: boolean) => void) | null;
}

export const useConfirmation = () => {
  const [state, setState] = useState<ConfirmationState>({
    isOpen: false,
    options: null,
    resolve: null,
  });

  const confirm = (options: ConfirmationOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setState({
        isOpen: true,
        options,
        resolve,
      });
    });
  };

  const handleConfirm = () => {
    if (state.resolve) {
      state.resolve(true);
    }
    setState({ isOpen: false, options: null, resolve: null });
  };

  const handleCancel = () => {
    if (state.resolve) {
      state.resolve(false);
    }
    setState({ isOpen: false, options: null, resolve: null });
  };

  const ConfirmationDialog = () => {
    if (!state.isOpen || !state.options) return null;

    return createPortal(
      <Box
        position="fixed"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bg="blackAlpha.600"
        display="flex"
        alignItems="center"
        justifyContent="center"
        zIndex="modal"
      >
        <Box
          bg="white"
          borderRadius="lg"
          p={6}
          maxW="md"
          mx={4}
          boxShadow="xl"
        >
          <VStack gap={4} align="stretch">
            <Text fontSize="lg" fontWeight="semibold" color="gray.800">
              {state.options.title}
            </Text>
            
            <Text color="gray.600" lineHeight="1.5">
              {state.options.message}
            </Text>
            
            <HStack gap={3} justify="flex-end">
              <Button
                variant="outline"
                onClick={handleCancel}
              >
                {state.options.cancelText || 'Cancelar'}
              </Button>
              <Button
                colorScheme={state.options.confirmColorScheme || 'red'}
                onClick={handleConfirm}
              >
                {state.options.confirmText || 'Confirmar'}
              </Button>
            </HStack>
          </VStack>
        </Box>
      </Box>,
      document.body
    );
  };

  return { confirm, ConfirmationDialog };
};
