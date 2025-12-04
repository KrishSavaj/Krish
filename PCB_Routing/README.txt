22-09-25
g++ -I../PCBBaseline/include -I../v6.0_autorouting_OOP_forEndSem_refactored_partially \
    main.cpp pcb_router.cpp occupancy_grid.cpp astar_router.cpp ml_ga_net_ordering.cpp \
    ../PCBBaseline/src/PCBBoard.cc \
    ../PCBBaseline/src/PCBComponent.cc ../PCBBaseline/src/Pin.cc ../PCBBaseline/src/Coordinate.cc ../PCBBaseline/src/json_utils.cpp\
    -o main

python3 parser2.py data/ACtoDCconverter.kicad_pcb data_files/merged_componentsACDC.json
python3 src/gnn_optimizer.py --pcb data/Jamma_rgbuntu_xbox360.kicad_pcb --use_ga
python3 parse_kicad ACtoDCconverter.kicad_pcb

20-09-25
Green CGPT
g++ -I../PCBBaseline/include main.cpp json_utils.cpp router.cpp occupancy_grid.cpp -o main

g++ main.cpp json_utils.cpp router.cpp occupancy_grid.cpp -o main

03-09-25
python3 parser2.py data/Jamma_rgbuntu_xbox360.kicad_pcb data_files/merged_components31.json
or
python3 parser2.py ACtoDCconverter.kicad_pcb merged_components2.json
g++ main.cpp json_utils.cpp router.cpp -o main
python3 vis7.py
python3 compare13.py


# 1. Create a virtual environment named "venv"
python3 -m venv venv

# 2. Activate the virtual environment
source venv/bin/activate
