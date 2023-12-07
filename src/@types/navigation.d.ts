import { ViagemModel } from 'core/database/models';

export type FormNavigationProps = {
  id?: string;
};

type ViagemForm = ViagemModel & { apenasConsulta: boolean };

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      CadastrarViagemForm: ViagemForm;
      AlterarViagemForm: ViagemForm;
      ConsultarViagemForm: ViagemForm;
      CadastrarEntrada: ViagemForm;
      ConsultarEntrada: ViagemForm;
      AlterarEntrada: ViagemForm;
    }
  }
}
