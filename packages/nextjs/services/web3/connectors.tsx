import { argent, braavos, InjectedConnector } from "@starknet-react/core";
import { getTargetNetworks } from "~~/utils/scaffold-stark";
import { BurnerConnector } from "./stark-burner/BurnerConnector";
import scaffoldConfig from "~~/scaffold.config";
import { KatanaConnector } from "./stark-burner/KatanaConnector";

const targetNetworks = getTargetNetworks();

export const connectors = getConnectors();

function withDisconnectWrapper(connector: InjectedConnector) {
  const connectorDisconnect = connector.disconnect;

  const _disconnect = (): Promise<void> => {
    localStorage.removeItem("lastUsedConnector");
    return connectorDisconnect();
  };

  connector.disconnect = _disconnect.bind(connector);
  return connector;
}

function getConnectors() {
  const { targetNetworks } = scaffoldConfig;

  const connectors = [];

  // Add connectors for Devnet
  if (targetNetworks.some((network) => network.network === "devnet")) {
    connectors.push(new BurnerConnector());
    connectors.push(argent());
    connectors.push(braavos());
  }

  // Add connectors for Katana
  if (targetNetworks.some((network) => network.network === "katana")) {
    connectors.push(new KatanaConnector());
    connectors.push(argent());
    connectors.push(braavos());
  }

  // Add connectors for Sepolia
  if (targetNetworks.some((network) => network.network === "sepolia")) {
    connectors.push(argent());
    connectors.push(braavos());
  }

  // Add connectors for Mainnet
  if (targetNetworks.some((network) => network.network === "mainnet")) {
    connectors.push(argent());
    connectors.push(braavos());
  }

  return connectors.sort(() => Math.random() - 0.5).map(withDisconnectWrapper);
}

export const appChains = targetNetworks;