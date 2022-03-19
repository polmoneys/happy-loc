import { matchSorter } from "match-sorter";
import {
  ChangeEvent,
  Fragment,
  KeyboardEvent,
  useEffect,
  useState,
} from "react";
import {
  FiAlignLeft,
  FiAlignRight,
  FiBarChart,
  FiBattery,
  FiBook,
  FiBookmark,
  FiBriefcase,
  FiCamera,
  FiCameraOff,
  FiShare,
  FiSmile,
  FiStar,
  FiX,
} from "react-icons/fi";

import Avatar1 from "@/assets/dp.png";
import Avatar2 from "@/assets/dp-2.jpg";
import Button from "@/components/Button/Button";
import ButtonGroup from "@/components/Button/variants/ButtonGroup";
import ButtonSplit from "@/components/Button/variants/ButtonSplit";
import Card from "@/components/Card/Card";
import CardMedia from "@/components/Card/CardMedia";
import Checkbox from "@/components/Checkbox/Checkbox";
import Chip from "@/components/Chip/Chip";
import Folder from "@/components/Folder/Folder";
import { HelveticaNeue, HelveticaNeueBold } from "@/components/Font/Font";
import For, { ObjectLike } from "@/components/For/For";
import Pagination, { paginateArray } from "@/components/For/Pagination";
import Grid from "@/components/Grid/Grid";
import HorizontalScroll from "@/components/HorizontalScroll/HorizontalScroll";
import Input from "@/components/Input/Input";
import Listbox from "@/components/Listbox/Listbox";
import Shape from "@/components/Shape/Shape";
import Shelf from "@/components/Shelf/Shelf";
import Stack from "@/components/Stack/Stack";
import Tooltip from "@/components/Tooltip/Tooltip";
import useCache from "@/hooks/UseCache/UseCache";
import useMixedState from "@/hooks/UseMixedState/UseMixedState";
import useSelectedState from "@/hooks/UseSelectedState/UseSelectedState";
import useSx from "@/hooks/UseSx/UseSx";
import {
  DEMO_BUTTON_GROUP,
  DEMO_BUTTON_SPLIT,
  DEMO_CHECKBOXES,
  DEMO_CHIPS,
  DEMO_FOLDER,
  DEMO_FOR,
  DEMO_LISTBOX,
  NO_RESULTS,
  Shape as ShapeInterface,
  Shapes,
  VALIDATE_URL,
  VALIDATE_USERNAME,
} from "@/stories/datum";
import Frame from "@/stories/frame";
// import Stat from "@/stories/stat";
import Title from "@/stories/title";

import styles from "./App.module.css";
import useStyles from "./hooks/UseStyles/UseStyles";

export default function App() {
  // Checkboxes
  const [{ output, all, mixed }, { onFollowerChange, onLeadChange }] =
    useMixedState(DEMO_CHECKBOXES);

  // For
  const [paginationActive, setPaginationActive] = useState(true);
  const [paginatedClient, setPaginatedClient] = useState<{
    data: any;
    pager: any;
  }>({
    data: [],
    pager: {},
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);

  useEffect(() => {
    if (paginationActive) {
      setPaginatedClient(paginateArray(DEMO_FOR, currentPage, itemsPerPage));
    }
  }, [currentPage, itemsPerPage, paginationActive]);

  // Button variants
  const [selection, { updateSelection }] = useSelectedState(
    DEMO_BUTTON_GROUP.map(x => x.id),
    "1",
    (i: any) => console.log(`Selected button ID ${i}`),
    true,
    true
  );

  const [selectionSplit, { updateSelection: updateSelectionSplit }] =
    useSelectedState(DEMO_BUTTON_SPLIT.map(x => x.id));

  const handleChange = (index: string) => {
    updateSelection(index);
  };

  const { output: fontSX } = useSx({ py: 3, f: 5 });
  const { output: iconSx } = useSx({ push: "left" });
  const { output: paperSx } = useSx({ paper: 4, p: 4 });

  // Client side search with query and results cached
  const cacheInstance = useCache();
  const [multipleSelections, setMultipleSelections] = useState<Shapes>([]);
  const [list, setList] = useState<Shapes>(DEMO_FOR);
  const [query, setQuery] = useState("");
  const [searching, setStatusSearch] = useState(false);

  const handleChangeInputSearch = (event: ChangeEvent<any>) => {
    const newQuery = event?.target?.value as string;
    if (!searching) {
      setStatusSearch(true);
    }
    if (newQuery.trim().length > 1) {
      const isInCache = cacheInstance.has(newQuery);

      if (!isInCache) {
        const matches = onSearch(query, DEMO_FOR);
        cacheInstance.set(newQuery, matches);
        setList(matches);
      } else {
        const fromCache = cacheInstance.get(newQuery) as Shapes;
        setList(fromCache);
      }
    }
    setQuery(newQuery);
  };

  useEffect(() => {
    if (query.trim() === "") {
      setList(DEMO_FOR);
      setStatusSearch(false);
    }
  }, [query]);

  function onSearch(term: string, list: Array<any>) {
    return term.trim() === ""
      ? NO_RESULTS
      : matchSorter(list, term, {
          keys: [mtch => `${mtch.name},${mtch.id}`],
        });
  }

  const { output: chipsInput } = useStyles(
    multipleSelections.length > 0 && styles.chipsRow
  );

  const limitChips =
    multipleSelections.length >= 3
      ? [...multipleSelections.slice(1, 2), { id: "all", name: "+2" }]
      : multipleSelections;
  const inputChipsStart =
    multipleSelections.length > 0 ? (
      <Shelf wrap gap="var(--gap-1)" px={1} className={chipsInput}>
        {limitChips?.map(chip => {
          // ADD TOOLTIP
          // if (chip.id === "all") {
          //   return (
          //     <Tooltip
          //       label={
          //         <Button color="text" onClick={() => onDeleteChip(chip)}>
          //           {chip.name}
          //         </Button>
          //       }
          //       variant="ghost"
          //     >
          //       <div className={styles.tooltipGhost}>
          //         {multipleSelections?.map(chip => (
          //           <HelveticaNeue key={chip.id}>{chip.name}</HelveticaNeue>
          //         ))}
          //       </div>
          //     </Tooltip>
          //   );
          // }
          return (
            <Chip
              key={chip.id}
              label={chip.name}
              onClick={() => onDeleteChip(chip)}
            />
          );
        })}
      </Shelf>
    ) : (
      <Fragment />
    );
  const onDeleteChip = (chip: ShapeInterface) => {
    if (chip.id === "all") {
      return setMultipleSelections([]);
    }
    const nextState = multipleSelections.filter(
      inStateChip => inStateChip.id !== chip.id
    );
    setMultipleSelections(nextState);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case "Enter":
        if (list.length === 1) {
          const current = list[0];
          if (multipleSelections.map(chp => chp.id).includes(current.id)) {
            return setMultipleSelections(prev =>
              prev.filter(chp => chp.id !== current.id)
            );
          }
          setMultipleSelections(prev => [...prev, current]);
        }
        break;
      default:
        return;
    }
  };

  return (
    <main className="app">
      <header className="full">
        <Title data-testid="title">
          HAPPY L
          <FiSmile
            color="var(--teal-4)"
            style={{ transform: "translateY(3px)" }}
          />
          C
        </Title>
      </header>
      <section className="container">
        <Grid>
          <Frame title="Button" subtitle="ButtonSplit">
            <Shelf gap="var(--gap-3)">
              <Button start={<FiCamera />} onClick={() => console.log("hi")}>
                SHOOT
              </Button>
              <Button stretch onClick={() => console.log("hi")}>
                Settings
              </Button>
              <Button end={<FiCameraOff />} onClick={() => console.log("hi")}>
                CANCEL
              </Button>
            </Shelf>
            <ButtonSplit
              items={DEMO_BUTTON_SPLIT}
              selection={selectionSplit}
              onChange={id => updateSelectionSplit(id)}
            />
          </Frame>
          <Frame title="ButtonGroup" subtitle="UseSelectedState">
            <Shelf direction="column">
              <ButtonGroup>
                {DEMO_BUTTON_GROUP.map(item => (
                  <ButtonGroup.Button
                    key={item.id}
                    className={
                      selection.includes(item.id) ? styles.active : styles.idle
                    }
                    onClick={() => handleChange(item.id)}
                  >
                    {item.label}
                  </ButtonGroup.Button>
                ))}
              </ButtonGroup>
            </Shelf>
            <ButtonGroup direction="vertical">
              {DEMO_BUTTON_GROUP.map(item => (
                <ButtonGroup.Button
                  key={item.id}
                  className={
                    selection.includes(item.id) ? styles.active : styles.idle
                  }
                  onClick={() => handleChange(item.id)}
                >
                  {item.label}
                </ButtonGroup.Button>
              ))}
            </ButtonGroup>
          </Frame>

          <Frame title="Checkbox" subtitle="UseMixedState">
            <Shelf wrap gap="2rem">
              <Checkbox
                name="all-condiments"
                value="condiments"
                checked={mixed}
                onChange={onLeadChange}
              >
                <Stack align="start">
                  <HelveticaNeueBold
                    dangerousColor="var(--teal-4)"
                    aria-hidden={all ? false : true}
                  >
                    Unselect all
                  </HelveticaNeueBold>
                  <HelveticaNeueBold
                    dangerousColor="var(--teal-4)"
                    aria-hidden={!all ? false : true}
                  >
                    Select all
                  </HelveticaNeueBold>
                </Stack>
              </Checkbox>

              {Object.entries(output).map(([value, state]) => (
                <div key={value}>
                  <Checkbox
                    name={value.toString().toLowerCase()}
                    value={value}
                    checked={state as boolean}
                    onChange={onFollowerChange}
                  >
                    <HelveticaNeueBold>{value}</HelveticaNeueBold>
                  </Checkbox>
                </div>
              ))}
            </Shelf>
          </Frame>
          <Frame title="Listbox">
            <Listbox
              label={"Choose your catalan delight"}
              initial="ensaimada"
              groups={DEMO_LISTBOX}
              onSelect={choice => console.log(choice)}
            />
          </Frame>

          <Frame title="Input" subtitle="Validation">
            <form onSubmit={() => console.log("SUBMITING")}>
              <Shelf direction="column" gap="var(--gap-3)">
                <Input
                  required
                  label="Username"
                  id="username"
                  name="username"
                  validation={VALIDATE_USERNAME}
                  onChange={d => console.log(d)}
                />
                <Input
                  label="Website"
                  name="url"
                  id="url"
                  validation={VALIDATE_URL}
                  onChange={d => console.log(d)}
                />
              </Shelf>
            </form>
          </Frame>

          <Frame title="useCache" subtitle="Hook">
            <Shelf direction="column" gap="var(--gap-3)">
              <Shelf
                balanced
                gap="var(--gap-3)"
                className={styles.inputWithChips}
              >
                <Input
                  labelHidden
                  start={inputChipsStart}
                  label="Selected shapes"
                  placeholder="Type shape"
                  id="shape"
                  name="shape"
                  value={query}
                  onFocus={() => setStatusSearch(true)}
                  onBlur={() => setStatusSearch(false)}
                  onChange={ev => handleChangeInputSearch(ev)}
                  onKeyDown={onKeyDown}
                />
              </Shelf>
              <Shelf wrap gap="var(--gap-1)">
                {list.map(listItem => (
                  <Shelf key={listItem.id} balanced className={styles.listLite}>
                    <Button
                      start={<FiStar size="14px" />}
                      color="text"
                      onClick={() => {
                        if (
                          multipleSelections
                            .map(chip => chip.id)
                            .includes(listItem.id)
                        ) {
                          return setMultipleSelections(prev =>
                            prev.filter(chp => chp.id !== listItem.id)
                          );
                        }
                        setMultipleSelections(prev => [...prev, listItem]);
                      }}
                    >
                      <HelveticaNeue>
                        <HelveticaNeueBold as="b">
                          {listItem.id}:
                        </HelveticaNeueBold>{" "}
                        {listItem.name.toLocaleUpperCase()}
                      </HelveticaNeue>
                    </Button>
                  </Shelf>
                ))}
              </Shelf>
            </Shelf>
          </Frame>
          <Frame title="Folder" subtitle="Nested structures">
            <Shelf direction="column" gap="var(--gap-3)">
              <Folder folder={DEMO_FOLDER} />
            </Shelf>
          </Frame>

          <Frame title="For + Pagination" subtitle="Shape">
            <For of={paginatedClient.data}>
              {({ item, key }: ObjectLike) => {
                const i = item as { id: number; name: string };
                const itemId = i?.id as number;
                const itemName = i?.name as string;

                return (
                  <Shelf key={key as number} p={4} className={styles.list}>
                    <Shape sides={itemId} fill="var(--teal-3)" />
                    <HelveticaNeueBold className="ml-auto">
                      {itemName}
                    </HelveticaNeueBold>
                  </Shelf>
                );
              }}
            </For>
            <HelveticaNeue>
              Page{" "}
              <HelveticaNeueBold as="span">
                {currentPage} of {paginatedClient.pager.totalPages}
              </HelveticaNeueBold>
              . Showing {itemsPerPage} entries per page of a{" "}
              <HelveticaNeueBold as="span">
                total of {paginatedClient.pager.totalItems}.
              </HelveticaNeueBold>
            </HelveticaNeue>
            <Shelf gap="100px">
              <Pagination
                current={currentPage}
                count={paginatedClient.pager.totalPages}
                handleChange={(event, page) => setCurrentPage(page)}
              />
            </Shelf>
          </Frame>
          <Frame noGap title="Horizontal scroll">
            <HorizontalScroll progress={false}>
              <Shelf gap="1em" className="py $$$$$">
                <Button onClick={() => ({})}>
                  <FiAlignLeft />
                </Button>
                <Button onClick={() => ({})}>
                  <FiAlignRight />
                </Button>
                <ButtonGroup className={styles.unsetBorderRadius}>
                  {DEMO_BUTTON_GROUP.map(item => (
                    <ButtonGroup.Button
                      key={item.id}
                      className={
                        selection.includes(item.id)
                          ? styles.active
                          : styles.idle
                      }
                      onClick={() => handleChange(item.id)}
                    >
                      {item.label}
                    </ButtonGroup.Button>
                  ))}
                </ButtonGroup>
                <Button onClick={() => ({})}>
                  <FiBarChart />
                </Button>
                <Button onClick={() => ({})}>
                  <FiBattery />
                </Button>
                <Button onClick={() => ({})}>
                  <FiBook />
                </Button>
                <Button onClick={() => ({})}>
                  <FiBriefcase />
                </Button>
              </Shelf>
            </HorizontalScroll>

            {/* <HorizontalScroll progress={false}>
              <Shelf gap="2em" className="py $$$$$">
                <Stat className="paper">
                  <HelveticaNeue>Fuck Putin</HelveticaNeue>
                </Stat>
                <Stat className="paper !!">
                  <FiStar />
                </Stat>
                <Stat className="paper !!!">
                  <HelveticaNeue>Fuck Putin</HelveticaNeue>
                </Stat>
                <Stat className="paper !!">
                  <FiStar />
                </Stat>
                <Stat className="paper !!!">
                  <HelveticaNeue>Fuck Putin</HelveticaNeue>
                </Stat>
                <Stat className="paper !!!">
                  <HelveticaNeue>Fuck Putin</HelveticaNeue>
                </Stat>
                <Stat className="paper !!!">
                  <HelveticaNeue>Fuck Putin</HelveticaNeue>
                </Stat>
                <Stat className="paper !!">
                  <FiStar />
                </Stat>
              </Shelf>
            </HorizontalScroll> */}

            <HorizontalScroll progress={false}>
              <Shelf gap="1em" className="py $$$$$">
                <Shelf
                  direction="column"
                  className="mini-card-portrait p $$ ratio ## paper"
                >
                  <HelveticaNeue>Fuck Putin</HelveticaNeue>
                </Shelf>
                <Shelf
                  direction="column"
                  className="mini-card-portrait p $$ ratio ## paper !!"
                >
                  <FiStar />
                </Shelf>
                <Shelf
                  direction="column"
                  className="mini-card-portrait p $$ ratio ## paper !!!"
                >
                  <HelveticaNeue>Fuck Putin</HelveticaNeue>
                </Shelf>
                <Shelf
                  direction="column"
                  className="mini-card-portrait p $$ ratio ## paper !!"
                >
                  <FiStar />
                </Shelf>
                <Shelf
                  direction="column"
                  className="mini-card-portrait p $$ ratio ## paper !!!"
                >
                  <HelveticaNeue>Fuck Putin</HelveticaNeue>
                </Shelf>
                <Shelf
                  direction="column"
                  className="mini-card-portrait p $$ ratio ## paper !!!"
                >
                  <HelveticaNeue>Fuck Putin</HelveticaNeue>
                </Shelf>
                <Shelf
                  direction="column"
                  className="mini-card-portrait p $$ ratio ## paper !!!"
                >
                  <HelveticaNeue>Fuck Putin</HelveticaNeue>
                </Shelf>
                <Shelf
                  direction="column"
                  className="mini-card-portrait p $$ ratio ## paper !!"
                >
                  <FiStar />
                </Shelf>
              </Shelf>
            </HorizontalScroll>
          </Frame>

          <Frame title="Tooltip" subtitle=":focus-visible & :focus-within">
            <Shelf>
              <Tooltip
                label="Destroy"
                offset={{
                  start: "0",
                  x: "0",
                  y: "52px",
                }}
                closeLabel={<FiX />}
              >
                <div className={styles.tooltipAlpha}>
                  <Shelf direction="column" className="pt $$$$$">
                    <HelveticaNeue size={2}>Warning</HelveticaNeue>
                    <HelveticaNeue className="pt $$$$$">
                      This action is destructive bla bla bla and can not be
                      undone...so, are you really really sure ?
                    </HelveticaNeue>
                    <Shelf className="mt-auto">
                      <Button className="ml-auto">Burn it</Button>
                    </Shelf>
                  </Shelf>
                </div>
              </Tooltip>
            </Shelf>

            <HelveticaNeue className="py $$$$$">
              Lorem Ipsum is simply{" "}
              <Tooltip
                label={<HelveticaNeueBold>Somiatruites</HelveticaNeueBold>}
                variant="inline"
              >
                <div className={styles.tooltipDelta}>
                  <Shelf className={styles.grow}>
                    <HelveticaNeueBold className="f @@ mr-auto">
                      Somiatruites
                    </HelveticaNeueBold>
                    <FiBookmark />
                  </Shelf>

                  <HelveticaNeue as="span" className="mt-auto">
                    Day dreamer.
                  </HelveticaNeue>
                </div>
              </Tooltip>
              text of the printing and typesetting centuries, but also the leap
              into electronic typesetting, remaining essentially unchanged. It
              was popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages.
            </HelveticaNeue>

            <Shelf>
              <Tooltip
                label="Destroy"
                className="ml-auto"
                offset={{
                  start: "0",
                  x: "calc(-100% + 112px)",
                  y: "52px",
                }}
              >
                <div className={styles.tooltipBeta}>
                  <Shelf direction="column" className={styles.grow}>
                    <HelveticaNeue>Are you sure ?</HelveticaNeue>
                    <Button className="mt-auto">Yes</Button>
                  </Shelf>
                </div>
              </Tooltip>
            </Shelf>
          </Frame>
          <Frame title="Col to Row" subtitle="Shelf">
            <Shelf direction="colToRow" gap="1em">
              <FiStar size={44} />
              <FiStar size={44} />
              <FiStar size={44} />
              <FiBookmark size={44} />
              <FiBookmark size={44} />
              <FiBookmark size={44} />
            </Shelf>
          </Frame>
          <Frame title="useSx" subtitle="Hook">
            <Shelf balanced>
              <p className={fontSX}>Styled paragraph </p>
              <FiStar className={iconSx} />
            </Shelf>

            <div className={paperSx}>
              <FiBookmark size={44} />
            </div>
          </Frame>
          <Frame title="Chip">
            <Shelf wrap gap="var(--gap-3)">
              {DEMO_CHIPS?.map(chip => (
                <Chip key={chip.id} {...chip} />
              ))}
              <Chip
                variant="pill"
                label="Some choice"
                onClick={() => console.log("pill")}
              />
            </Shelf>
          </Frame>
        </Grid>
        <br />
        <Frame title="Card + Ratio">
          <Shelf direction="column" gap="var(--gap-5)">
            <Grid gap="var(--gap-4)">
              <Card
                ratio="classic"
                gradient={{
                  position: "start",
                  color: "var(--teal-3)",
                }}
              >
                <CardMedia src={Avatar2} height="220px" />

                <Shelf p={4} direction="column" gap="var(--gap-5)">
                  <HelveticaNeue size={4}> Card Title 1</HelveticaNeue>
                  <HelveticaNeue>
                    {" "}
                    Card Excerpt is a lorem ipsun dolor sit amet indiscliplintur
                    gloria aest at altum laude.{" "}
                  </HelveticaNeue>
                </Shelf>
                <Shelf className="p $$$$ mt-auto">
                  <Button onClick={() => console.log("hi")}>
                    <FiStar />
                  </Button>
                  <Button onClick={() => console.log("hi")}>
                    <FiBookmark />
                  </Button>
                  <Button
                    color="secondary"
                    className="ml-auto"
                    onClick={() => console.log("hi")}
                  >
                    <FiShare color="var(--gray-8)" />
                  </Button>
                </Shelf>
              </Card>
              <Card
                ratio="classic"
                gradient={{
                  position: "end",
                  color: "var(--teal-3)",
                }}
              >
                <Shelf p={4}>
                  <Button onClick={() => console.log("hi")}>
                    <FiStar />
                  </Button>
                  <Button onClick={() => console.log("hi")}>
                    <FiBookmark />
                  </Button>
                  <Button
                    color="secondary"
                    className="ml-auto"
                    onClick={() => console.log("hi")}
                  >
                    <FiShare color="var(--gray-8)" />
                  </Button>
                </Shelf>
                <Shelf
                  className="p $$$$  mt-auto"
                  direction="column"
                  gap="var(--gap-5)"
                >
                  <HelveticaNeue size={4}> Card Title 1</HelveticaNeue>
                  <HelveticaNeue>
                    {" "}
                    Card Excerpt is a lorem ipsun dolor sit amet indiscliplintur
                    gloria aest at altum laude.{" "}
                  </HelveticaNeue>
                </Shelf>

                <CardMedia src={Avatar2} height="220px" />
              </Card>
            </Grid>
            <Grid gap="var(--gap-4)">
              <Card ratio="square">
                <CardMedia src={Avatar2} height="220px" />

                <Shelf p={4} direction="column" gap="var(--gap-5)">
                  <HelveticaNeue size={4}> Card Title 1</HelveticaNeue>
                  <HelveticaNeue>
                    {" "}
                    Card Excerpt is a lorem ipsun dolor sit amet indiscliplintur
                    gloria aest at altum laude.{" "}
                  </HelveticaNeue>
                </Shelf>
                <Shelf className="p $$$$ mt-auto">
                  <Button onClick={() => console.log("hi")}>
                    <FiStar />
                  </Button>
                  <Button onClick={() => console.log("hi")}>
                    <FiBookmark />
                  </Button>
                  <Button
                    color="secondary"
                    className="ml-auto"
                    onClick={() => console.log("hi")}
                  >
                    <FiShare color="var(--gray-8)" />
                  </Button>
                </Shelf>
              </Card>
              <Card ratio="square">
                <CardMedia src={Avatar1} height="220px" />
                <Shelf p={4} direction="column" gap="var(--gap-5)">
                  <HelveticaNeue size={4}> Card Title 1</HelveticaNeue>
                  <HelveticaNeue>
                    {" "}
                    Card Excerpt is a lorem ipsun dolor sit amet indiscliplintur
                    gloria aest at altum laude.{" "}
                  </HelveticaNeue>
                </Shelf>
                <Shelf className="p $$$$ mt-auto">
                  <Button onClick={() => console.log("hi")}>
                    <FiStar />
                  </Button>
                  <Button onClick={() => console.log("hi")}>
                    <FiBookmark />
                  </Button>
                  <Button
                    color="secondary"
                    className="ml-auto"
                    onClick={() => console.log("hi")}
                  >
                    <FiShare color="var(--gray-8)" />
                  </Button>
                </Shelf>
              </Card>
              <Card ratio="square">
                <CardMedia
                  src="https://images.unsplash.com/34/BA1yLjNnQCI1yisIZGEi_2013-07-16_1922_IMG_9873.jpg?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                  height="220px"
                />

                <Shelf p={4} direction="column" gap="var(--gap-5)">
                  <HelveticaNeue size={4}> Card Title 1</HelveticaNeue>
                  <HelveticaNeue>
                    {" "}
                    Card Excerpt is a lorem ipsun dolor sit amet indiscliplintur
                    gloria aest at altum laude.{" "}
                  </HelveticaNeue>
                </Shelf>
                <Shelf className="p $$$$ mt-auto">
                  <Button onClick={() => console.log("hi")}>
                    <FiStar />
                  </Button>
                  <Button onClick={() => console.log("hi")}>
                    <FiBookmark />
                  </Button>
                  <Button
                    color="secondary"
                    className="ml-auto"
                    onClick={() => console.log("hi")}
                  >
                    <FiShare color="var(--gray-8)" />
                  </Button>
                </Shelf>
              </Card>
            </Grid>

            <Grid gap="var(--gap-4)">
              <Card ratio="portrait">
                <CardMedia src={Avatar1} height="360px" />

                <Shelf p={4} direction="column" gap="var(--gap-5)">
                  <HelveticaNeue size={4}> Card Title 1</HelveticaNeue>
                  <HelveticaNeue>
                    {" "}
                    Card Excerpt is a lorem ipsun dolor sit amet indiscliplintur
                    gloria aest at altum laude.{" "}
                  </HelveticaNeue>
                </Shelf>
                <Shelf className="p $$$$ mt-auto">
                  <Button onClick={() => console.log("hi")}>
                    <FiStar />
                  </Button>
                  <Button onClick={() => console.log("hi")}>
                    <FiBookmark />
                  </Button>
                  <Button
                    color="secondary"
                    className="ml-auto"
                    onClick={() => console.log("hi")}
                  >
                    <FiShare color="var(--gray-8)" />
                  </Button>
                </Shelf>
              </Card>

              <Card ratio="portrait">
                <CardMedia
                  src="https://images.unsplash.com/34/BA1yLjNnQCI1yisIZGEi_2013-07-16_1922_IMG_9873.jpg?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                  height="360px"
                />

                <Shelf p={4} direction="column" gap="var(--gap-5)">
                  <HelveticaNeue size={4}> Card Title 1</HelveticaNeue>
                  <HelveticaNeue>
                    {" "}
                    Card Excerpt is a lorem ipsun dolor sit amet indiscliplintur
                    gloria aest at altum laude.{" "}
                  </HelveticaNeue>
                </Shelf>
                <Shelf className="p $$$$ mt-auto">
                  <Button onClick={() => console.log("hi")}>
                    <FiStar />
                  </Button>
                  <Button onClick={() => console.log("hi")}>
                    <FiBookmark />
                  </Button>
                  <Button
                    color="secondary"
                    className="ml-auto"
                    onClick={() => console.log("hi")}
                  >
                    <FiShare color="var(--gray-8)" />
                  </Button>
                </Shelf>
              </Card>
              <Card ratio="portrait">
                <CardMedia src={Avatar2} height="360px" />

                <Shelf p={4} direction="column" gap="var(--gap-5)">
                  <HelveticaNeue size={4}> Card Title 1</HelveticaNeue>
                  <HelveticaNeue>
                    {" "}
                    Card Excerpt is a lorem ipsun dolor sit amet indiscliplintur
                    gloria aest at altum laude.{" "}
                  </HelveticaNeue>
                </Shelf>
                <Shelf className="p $$$$ mt-auto">
                  <Button onClick={() => console.log("hi")}>
                    <FiStar />
                  </Button>
                  <Button onClick={() => console.log("hi")}>
                    <FiBookmark />
                  </Button>
                  <Button
                    color="secondary"
                    className="ml-auto"
                    onClick={() => console.log("hi")}
                  >
                    <FiShare color="var(--gray-8)" />
                  </Button>
                </Shelf>
              </Card>
            </Grid>

            <Grid gap="var(--gap-4)">
              <Card ratio="landscape">
                <CardMedia src={Avatar1} height="180px" />

                <Shelf p={4} direction="column" gap="var(--gap-5)">
                  <HelveticaNeue size={4}> Card Title 1</HelveticaNeue>
                  <HelveticaNeue>
                    {" "}
                    Card Excerpt is a lorem ipsun dolor sit amet indiscliplintur
                    gloria aest at altum laude.{" "}
                  </HelveticaNeue>
                </Shelf>
                <Shelf className="p $$$$ mt-auto">
                  <Button onClick={() => console.log("hi")}>
                    <FiStar />
                  </Button>
                  <Button onClick={() => console.log("hi")}>
                    <FiBookmark />
                  </Button>
                  <Button
                    color="secondary"
                    className="ml-auto"
                    onClick={() => console.log("hi")}
                  >
                    <FiShare color="var(--gray-8)" />
                  </Button>
                </Shelf>
              </Card>
              <Card ratio="landscape">
                <CardMedia
                  src="https://images.unsplash.com/34/BA1yLjNnQCI1yisIZGEi_2013-07-16_1922_IMG_9873.jpg?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                  height="180px"
                />

                <Shelf p={4} direction="column" gap="var(--gap-5)">
                  <HelveticaNeue size={4}> Card Title 1</HelveticaNeue>
                  <HelveticaNeue>
                    {" "}
                    Card Excerpt is a lorem ipsun dolor sit amet indiscliplintur
                    gloria aest at altum laude.{" "}
                  </HelveticaNeue>
                </Shelf>
                <Shelf className="p $$$$ mt-auto">
                  <Button onClick={() => console.log("hi")}>
                    <FiStar />
                  </Button>
                  <Button onClick={() => console.log("hi")}>
                    <FiBookmark />
                  </Button>
                  <Button
                    color="secondary"
                    className="ml-auto"
                    onClick={() => console.log("hi")}
                  >
                    <FiShare color="var(--gray-8)" />
                  </Button>
                </Shelf>
              </Card>
              <Card ratio="landscape">
                <CardMedia src={Avatar2} height="180px" />

                <Shelf p={4} direction="column" gap="var(--gap-5)">
                  <HelveticaNeue size={4}> Card Title 1</HelveticaNeue>
                  <HelveticaNeue>
                    {" "}
                    Card Excerpt is a lorem ipsun dolor sit amet indiscliplintur
                    gloria aest at altum laude.{" "}
                  </HelveticaNeue>
                </Shelf>
                <Shelf className="p $$$$ mt-auto">
                  <Button onClick={() => console.log("hi")}>
                    <FiStar />
                  </Button>
                  <Button onClick={() => console.log("hi")}>
                    <FiBookmark />
                  </Button>
                  <Button
                    color="secondary"
                    className="ml-auto"
                    onClick={() => console.log("hi")}
                  >
                    <FiShare color="var(--gray-8)" />
                  </Button>
                </Shelf>
              </Card>
            </Grid>
          </Shelf>
        </Frame>
      </section>
    </main>
  );
}
